import React from 'react'
import Grid from '../../components/Grid'
import NumberLink from '../../components/NumberLink'
import PreHeader from '../../components/PreHeader'

function InlineJinja ({children}) {
    return (<p>
        {`{{ `}
        {children}
        {` }}`}
    </p>)
}

export default function Hello() {
    return (
        <React.Fragment>
            <PreHeader className="pre-header test-extra" text="This is a preheader with hidden text" style={{ color: 'red' }} />
            <Grid>
                <h1 className="header-class">Hello Ally-Templates 👋🏾</h1>
                <p className="extra-class">Reach us at: <NumberLink number={18559252559} /></p>
                <p>{`{{ EventAttribute['promisePaymentDueDate']|dateFormatter('%-m/`}<span>{`%-d`}</span>{`/%Y') }}`}</p>
                <InlineJinja>
                    EventAttribute['inlineTestVar'] == true ? <span><strong>yes</strong></span> : <span>no</span>
                </InlineJinja>
            </Grid>
        </React.Fragment>
    )
}