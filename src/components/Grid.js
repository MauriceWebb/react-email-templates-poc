import React from 'react'

function Column({ children, style = {}, className }) {
    return <td {...{ style, className }}>{children}</td>
}

function Row({ children, style = {} }) {
    return (
        <tr {...{ style }}>
            {React.Children.map(children, el => {
                if (el.type === Column) return el
                return <Column>{el}</Column>
            })}
        </tr>
    )
}

function Grid({ children, style = {} }) {
    return (
        <table {...{ style }}>
            <tbody>
                {React.Children.map(children, el => {
                    if (!el) return
                    if (el.type === Row) return el
                    if (el.type === Column) return <Row>{el}</Row>
                    return (
                        <Row>
                            <Column>{el}</Column>
                        </Row>
                    )
                })}
            </tbody>
        </table>
    )
}

Grid.Row = Row;
Grid.Column = Column;

export default Grid;