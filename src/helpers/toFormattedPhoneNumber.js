export default function toFormattedPhoneNumber (num) {
    if(typeof num === 'number') {
        num = String(num)
    }
    
    if (num.length !== 11) {
        throw Error("'num' argument must be 11 digits in length.")
    }

    return `+${num[0]}-${num.substring(1, 4)}-${num.substring(4, 7)}-${num.substring(num.length - 4)}`
}