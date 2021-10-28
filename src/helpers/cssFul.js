export default class Cssful {
    constructor(json) {
        this.css = json
    }

    inline(selectors) {
        // if only one argument and it's a string, add to proper obj key:
        // if array, verify each item is a string and add to proper obj key:
        // if object, validate each item is correct
    }

    validateSelector(selector, type) {
        switch (type) {
            case 'element': {
                return /^[a-zA-Z0-9]+$/.test(selector)
            }
            case 'class': {
                return /^\.[a-zA-Z0-9-]+[a-zA-Z0-9]$/.test(selector)
            }
            case 'id': {
                return /^#[a-zA-Z0-9-]+[a-zA-Z0-9]$/.test(selector)
            }
            default: { return false }
        }
    }
}