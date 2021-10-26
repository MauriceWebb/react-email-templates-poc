import React from 'react'

export default function PreHeader({
    text,
    children,
    style,
    className
}) {
    if (!text && !children) return
    return <span hidden={true} {...{ style, className }}>
        {text || children}
    </span>
}