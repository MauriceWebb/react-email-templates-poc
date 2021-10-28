import React from 'react'

function Column({ children, style = {}, className }) {
    return <td {...{ style, className }}>{children}</td>
}

function Row({ children, style = {}, className }) {
    return (
        <tr {...{ style, className }}>
            {React.Children.map(children, el => {
                if (el.type === Column) return el
                return <Column>{el}</Column>
            })}
        </tr>
    )
}

function Grid({ children, style = {}, className }) {
    return (
        <table {...{ style, className }}>
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