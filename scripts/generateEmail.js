const fs = require('fs');
const fse = require('fs-extra')
const Path = require('path');
const ReactDOMServer = require('react-dom/server');
const css = require('css');
const prettier = require('prettier')
var argv = require('minimist')(process.argv.slice(2));

// MAIN:
generateEmail()
    .catch(err => console.log(err))

// FUNCTIONS:

function toCamelCase (string) {
    return string.replace(/-./g, x => x[1].toUpperCase())
}

async function generateEmail() {
    // 0. verify all required env vars were provided:
    verifyEnvVars()

    // 1. read react template via env:
    const reactTemplate = await getReactTemplate()

    // 2. convert react template to html:
    const email = await reactToHTML(reactTemplate)
    // const email = await reactToHTML(Email)

    // 3. save html within correct moE dir:
    await saveEmail(email)
}

/**
 * Get the file from a relative path
 * @param {String} relativePath
 * @return {Promise.<string>}
 */
function getFile(relativePath) {
  return new Promise((resolve, reject) => {
    const path = Path.join(__dirname, relativePath);

    return fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    })
  });
}

function verifyEnvVars() {
    const missingVars = []
    const requiredVars = [
        'reactTemplateFilepath',
    ]

    requiredVars.forEach(reqVar => {
        if (!argv[reqVar]) { missingVars.push(reqVar) }
    })

    if (missingVars.length > 0) {
        throw Error(`The following parameters must be provided:\n\t- ${missingVars.join('\n\t- ')}\n`)
    }
}

function getReactTemplate() {
    return require(Path.join(
        __dirname,
        '../lib/templates',
        argv['reactTemplateFilepath']
    )).default;
}

function stylizeReact(reactComponent, styleObj = {}) {
    if (typeof reactComponent === 'string') { return reactComponent }
    const tmpComp = {...reactComponent}
    const inlineStyles = tmpComp.props?.style || {}
    // add class styles first:
    const classStyles = tmpComp.props?.className?.split(' ')
        .reduce((obj, name) => {
            const copiedStyleObj = styleObj[`.${name}`]
            obj = {
                ...obj,
                ...copiedStyleObj
            }
            return obj
        }, {})
    // add id styles:
    const idStyles = tmpComp.props?.id?.split(' ')
        .reduce((obj, name) => {
            const copiedStyleObj = styleObj[`#${name}`]
            obj = {
                ...obj,
                ...copiedStyleObj
            }
            return obj
        }, {})

    const componentNewStyles  = {
        ...classStyles,
        ...idStyles,
        ...inlineStyles
    }

    tmpComp.props = {
        ...reactComponent.props,
        style: componentNewStyles
    }

    if (tmpComp.props.children && Array.isArray(tmpComp.props.children)) {
        tmpComp.props.children = tmpComp.props.children
            .map(childComponent => stylizeReact(childComponent, styleObj))
    }

    return tmpComp
}

async function reactToHTML(reactTemplate) {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    let styles = ''
    let reactStyleObj = {}
    let pathToStylesheet
    const proposedCssFilepathSplit = argv['reactTemplateFilepath'].split('/')
    let proposedCssFilepath = '../src/templates/' + proposedCssFilepathSplit
        .slice(
            0,
            proposedCssFilepathSplit.length - 1 > 0 ? 
                proposedCssFilepathSplit.length - 1 : undefined
        )
        .join('/') + '/styles.css'

    // if arg['templateStylesFilepath'] was passed, determine and set pathToStylesheet:
    // else set pathToStyleSheet to cssFilepath:
    if (argv['templateStylesFilepath']) {
        pathToStylesheet = Path.join('../src/templates', argv['templateStylesFilepath'])
    } else {
        pathToStylesheet = proposedCssFilepath
    }

    // verify that file exists and store boolean to variable:
    const styleSheetExists = fse.existsSync(Path.resolve(__dirname, pathToStylesheet))
    
    // get styles:
    const htmlStyleObj = styleSheetExists ? await cssToObj({pathToStylesheet}) : {}
    reactStyleObj = styleSheetExists ? await cssToObj({pathToStylesheet, camelCaseStyleProps: true }) : {}
    const htmlStyleStr = Object.entries(htmlStyleObj)
        .reduce((str, [className, props]) => {
            str += `${className} {\n`
            Object.entries(props).forEach(([prop, rule]) => {
                str += `  ${prop}: ${rule};\n`
            })
            str += '}\n'
            return str
        }, '')
    styles = styleSheetExists ? htmlStyleStr : ''

    // get html:
    let emailHTML = await getFile('./email.html')
    const stylizedReactTemplate = stylizeReact(reactTemplate(), reactStyleObj)
    const html = ReactDOMServer.renderToStaticMarkup(stylizedReactTemplate)
    const formattedHTML = prettier
        .format(html.trim(), { ...prettierConfig, parser: 'html' })
    const formattedCSS = prettier
        .format(styles.trim(), { ...prettierConfig, parser: 'css' })
    
    emailHTML = emailHTML
        .trim()
        .replace(/%CONTENT%/g, formattedHTML)
        .replace(/%STYLE%/g, formattedCSS)
        
    return emailHTML
}

async function cssToObj ({pathToStylesheet, styles = {}, camelCaseStyleProps = false}) {
    // 1. get stylesheet:
    const cssFile = await getFile(pathToStylesheet)
    
    // 2. parse stylesheet to array of rules
    const cssRules = css.parse(cssFile, { source: pathToStylesheet })
        .stylesheet
        .rules
    // 3. store selector and declarations to style obj
    const rulesObj = await cssRules
        .reduce(async (styleObj, rule, idx) => {
            styleObj = await styleObj
            // 3.1. if import, return cssToObj(pathToImportedStylesheet):
            if (rule.import) {
                // './extraStyles.css'
                const impf = /url\('(.*\.css)'\)/.exec(rule.import)[1]
                // './extraStyles.css'.split('../') –> Array.length = 0
                const impfSplit = impf.split('../')
                // '../src/templates/Hello/styles.css'.split('/') –> Array.length = 5
                const rpsrcSplit = rule.position.source.split('/')
                // pathToImportedStylesheet:
                const pathToImportedStylesheet = rpsrcSplit
                    // determine how many levels to cd up by impSrcSplit.length - 1:
                    .slice(0,rpsrcSplit.length - 1 - (impfSplit.length - 1))
                    .join('/') + `/${impfSplit.join('/')}`.replace(/\.\/|\.\.\//g, '')
                // update stylesObj:
                styleObj = { 
                    ...styleObj, 
                    ...await cssToObj({
                        pathToStylesheet: pathToImportedStylesheet, 
                        styles: styleObj,
                        camelCaseStyleProps
                    }) 
                }
            } 
            else if (rule.selectors && rule.declarations) {
                // 3.2. For now, only apply rules for classes and ids:
                // if (!/^[.|#][a-zA-Z]+[-\w]*$/.test(rule.selectors[0])) { 
                //     return styleObj 
                // }
                
                styleObj[rule.selectors[0]] = rule.declarations
                    .reduce((dObj, {property, value}) => {
                        if (camelCaseStyleProps) {
                            property = toCamelCase(property)
                        }

                        dObj[property] = value
                        return dObj
                    }, {})
            }

            return styleObj
        }, styles)

    styles = {
        ...styles,
        ...rulesObj
    }

    // 4. return style obj
    return styles
}

function saveEmail(email) {
    const proposedMoeFilenameSplit = argv['reactTemplateFilepath'].split('/')
    const proposedMoeFilename = (
        proposedMoeFilenameSplit.length > 2 ?
        proposedMoeFilenameSplit
            .slice(0, proposedMoeFilenameSplit.length - 1)
            .join('/') : proposedMoeFilenameSplit[0]
    ).toLowerCase() + '.html'
        
    const moeFilepath = argv['moeFilepath'] || proposedMoeFilename
    return new Promise((resolve, reject) => {
        fse.outputFileSync(Path.join(__dirname,'../moE',moeFilepath), email, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }