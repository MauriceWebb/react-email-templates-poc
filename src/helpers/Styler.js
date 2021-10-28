import * as nativeCss from 'native-css'

export default class Styler {
    constructor({ stylesheet }) {
        this.stylesheet = stylesheet;
    }

    byClass(classes, style = {}) {
        let className = ''

        for (const key in classes) {
            const selector = classes[key]
            const rules = this.stylesheet[selector]

            if (rules) {
                const styles = rules.split(';')
                for (const key_ in styles) {
                    const [attribute, value] = styles[key_].split(':')
                    const attr = attribute
                        .replace(/-([a-z])/g, g => g[1].toUpperCase())
                    style[attr.trim()] = value.trim()
                }
            }

            className += ` ${selector.substring(1)}`
        }

        return {
            style,
            className
        }
    }
}