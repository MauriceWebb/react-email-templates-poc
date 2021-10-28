const fs = require('fs');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactDOM = require('react-dom')
const css = require('css');
var argv = require('minimist')(process.argv.slice(2));


const STYLE_TAG = '%STYLE%';
const CONTENT_TAG = '%CONTENT%';

generateEmail()
    .catch(err => console.log(err))


// FUNCTIONS:

async function generateEmail() {
    // 0. verify all required env vars were provided:
    verifyEnvVars()

    // 1. read react template via env:
    const reactTemplate = await getReactTemplate()

    // 2. convert react template to html:
    const email = await reactToHTML(reactTemplate)
    // const email = await reactToHTML(Email)

    // 3. save html within correct moE:
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
        'moeFilepath'
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

function stylizeReact(reactComponent) {
    // console.log(reactComponent.props.children)
    reactComponent.props.children = React.Children.map(reactComponent.props.children, (el, idx) => {
        // console.log(el.type.name)
    })
    // console.log(reactComponent.ref)
}

async function reactToHTML(reactTemplate) {
    stylizeReact(reactTemplate())
    const reactEmail = React.createElement(reactTemplate)
    const html = ReactDOMServer.renderToStaticMarkup(reactEmail)

    let emailHTML = await getFile('./email.html')
    let styles = ''

    if (argv['templateStylesFilepath']) {
        const templatesFolder = '../src/templates'
        const pathToStylesheet = Path
            .join(templatesFolder, argv['templateStylesFilepath'])
        const styleObj = await cssToObj(pathToStylesheet)
        const styleJSON = JSON.stringify(styleObj, null, 2)
        styles = styleJSON
            .substring(1, styleJSON.length - 1)
            .replace(/"|(?<=})\s*,/g, '')
            .replace(/:\s*{/g, ' {')
            .replace(/(?<=\w),\n|(:.*\w\s)/g, match => {
                if (match.trim() === ',') return ';\n'
                return  ` ${match.trim()};\n`
            })
        
        console.log('styles:', styles)
    }

    emailHTML = emailHTML
        .trim()
        .replace(CONTENT_TAG, html.trim())
        .replace(STYLE_TAG, styles.trim())
        
    return emailHTML
}

async function cssToObj (pathToStylesheet, styles = {}, i = 0) {
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
            // console.log('styleObj:', styleObj)
            // console.log(`RULE-${i}-${idx}:`, rule)
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
                styleObj = { ...styleObj, ...await cssToObj(
                    pathToImportedStylesheet, 
                    styleObj,
                    i+1
                ) }
            } 
            else if (rule.selectors && rule.declarations) {
                // 3.2. For now, only apply rules for classes and ids:
                if (!/^[\.|#][a-zA-Z]+[-\w]*$/.test(rule.selectors[0])) { 
                    return styleObj 
                }
                
                styleObj[rule.selectors[0]] = rule.declarations
                    .reduce((dObj, {property, value}) => {
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
    return new Promise((resolve, reject) => {
      fs.writeFile(Path.join(
          __dirname,
          '../moE',
          argv['moeFilepath']
      ), email, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }