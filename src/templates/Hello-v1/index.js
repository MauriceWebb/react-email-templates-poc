import React from 'react'
import Grid from '../../components/Grid'
import NumberLink from '../../components/NumberLink'
import PreHeader from '../../components/PreHeader'
import Jinja from '../../components/Jinja'

export default function Hello() {
    return (
        <React.Fragment>
            <PreHeader className="pre-header test-extra" text="This is a preheader with hidden text" style={{ color: 'red' }} />
            <Grid>
                <h1 className="header-class">Hello Ally-Templates 👋🏾</h1>
                <p className="extra-class">Reach us at: <NumberLink number={18559252559} /></p>
                <Jinja>
                    EventAttribute['promisePaymentDueDate']|dateFormatter('%-m/<span>%-d</span>/%Y')
                </Jinja>
                <Jinja>
                    EventAttribute['inlineTestVar'] == true ? <span id="blue-box-span"><strong>yes</strong></span> : <span>no</span>
                </Jinja>
            </Grid>
        </React.Fragment>
    )
}