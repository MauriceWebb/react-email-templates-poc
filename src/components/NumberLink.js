import React from 'react'
import toDigitsOnly from '../helpers/toDigitsOnly'
import toFormattedPhoneNumber from '../helpers/toFormattedPhoneNumber'

export default function NumberLink({
    number,
    style,
    className,
    children
}) {
    if (!number && !children) return

    const pNum = number ? toDigitsOnly(number) : null
    const fNum = toFormattedPhoneNumber(pNum)

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