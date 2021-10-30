import React from 'react'

export default function PreHeader({children,...props}) {
    return <span hidden={true} {...props}>
        {children}
    </span>
}