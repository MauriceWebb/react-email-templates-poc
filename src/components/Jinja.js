import React from 'react'

function Jinja({children}) {
    return <React.Fragment>{`{{ `}{children}{` }}`}</React.Fragment>
}

function Comment({children}) {
    return <React.Fragment>{`{# `}{children}{` #}`}</React.Fragment>
}

function Block({children}) {
    return <React.Fragment>{`{% `}{children}{` %}`}</React.Fragment>
}

function For({children, condition}) {
    return (
        <React.Fragment>
            <Block>for {condition}</Block>
                {children}
            <Block>endfor</Block>
        </React.Fragment>
    )
}

function If({children, condition}) {
    const childEls = React.Children.toArray(children)
    const lastChildEl = childEls[childEls.length - 1]
    const shouldRenderElse = lastChildEl.type !== Else
    return (
        <React.Fragment>
            <Block>if {condition}</Block>
                {children}
            {shouldRenderElse && <Else />}
            <Block>endif</Block>
        </React.Fragment>
    )
}

function Elif({children, condition}) {
    return (
        <React.Fragment>
            <Block>elif {condition}</Block>
            {children}
        </React.Fragment>
    )
}

function Else({children}) {
    return (
        <React.Fragment>
            <Block>else</Block>
            {children}
        </React.Fragment>
    )
}

Jinja.Comment = Comment
Jinja.Block = Block
Jinja.For = For
Jinja.If = If
Jinja.Elif = Elif
Jinja.Else = Else

export default Jinja
