export default function toDigitsOnly (num) {
    return String(num).replace(/\D/g, '')
}