import React from 'react'

function Column({ children, ...props }) {
    return <td {...props}>{children}</td>
}

function Row({ children, ...props }) {
    return (
        <tr {...props}>
            {React.Children.map(children, el => {
                if (el.type === Column) return el
                return <Column>{el}</Column>
            })}
        </tr>
    )
}

function Grid({ children, ...props}) {
    return (
        <table {...props}>
            <tbody>
                {React.Children.map(children, el => {
                    if (!el) return
                    if ([Row, DividerRow].includes(el.type)) return el
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

function DividerRow() {
    return (
        <Row>
            <Column style={{
                textAlign: 'center',
                backgroundColor: '#eee'
            }}>
                <Grid
                    cellSpacing={0}
                    cellPadding={0}
                    style={{
                        width: "95%"
                    }}
                    width="95%"
                >
                    <Row>
                        <Column style={{
                            backgroundColor: "#dadada",
                            fontSize: 0,
                            lineHeight: 1,
                            height: 2
                        }}>
                            <img src="http://image.email.ally.com/lib/fe651570746c03787615/m/1/spaceTrans.gif" width="1" height="1" alt=""/>
                        </Column>
                    </Row>
                    <Row>
                        <Column style={{
                            backgroundColor: "#fff",
                            fontSize: 0,
                            lineHeight: 1,
                            height: 2
                        }}>
                            <img src="http://image.email.ally.com/lib/fe651570746c03787615/m/1/spaceTrans.gif" width="1" height="1" alt="" />
                        </Column>
                    </Row>
                </Grid>
            </Column>
        </Row>
    )
}

Grid.Row = Row;
Grid.Column = Column;
Grid.DividerRow = DividerRow;

export default Grid;