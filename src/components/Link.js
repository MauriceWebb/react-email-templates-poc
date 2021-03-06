import React from 'react'

export default function Link({children, ...props}) {
    return (
        <a className="link" target="_blank" {...props}>
            <strong>
                <span>
                    <nobr>
                        {children}
                    </nobr>
                </span>
            </strong>
        </a>
    )
}