const fs = require('fs');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
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

async function reactToHTML(reactTemplate) {
    const reactEmail = React.createElement(reactTemplate)
    const html = ReactDOMServer.renderToStaticMarkup(reactEmail)

    let emailHTML = await getFile('./email.html')
    let styles = argv['templateStylesFilepath'] ? (await getFile(
        `../src/templates/${argv['templateStylesFilepath']}`
        )) : ''

    emailHTML = emailHTML
        .trim()
        .replace(CONTENT_TAG, html.trim())
        .replace(STYLE_TAG, styles.trim())
        
    return emailHTML
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