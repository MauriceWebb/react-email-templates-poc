export default function toCamelCase (string) {
    return string.replace(/-./g, x => x[1].toUpperCase())
}