import React from 'react'

export default function NumberLink({
    number,
    style,
    className,
    children
}) {
    if (!number && !children) return

    const pNum = number ? String(number).replace(/\D/g, '') : null
    if (pNum.length !== 11) throw Error("NumberLink's 'number' prop must be 11 digits in length.")

    const fNum = `+${pNum[0]}-${pNum.substring(1, 4)}-${pNum.substring(4, 7)}-${pNum.substring(pNum.length - 4)}`

    return (
        <a
            href={pNum ? `tel:+${pNum}` : ''}
            alias="Call"
            {...{ style, className }}
        >
            <span>
                <span>{fNum || children}</span>
            </span>
        </a>
    )
}