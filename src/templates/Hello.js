import React from 'react'
import Grid from '../components/Grid'
import NumberLink from '../components/NumberLink'
import PreHeader from '../components/PreHeader'

export default function Hello() {
    return (
        <React.Fragment>
            <PreHeader text="This is a preheader with hidden text" />
            <Grid>
                <h1>Hello Ally-Templates 👋🏾</h1>
                <p>Reach us at: <NumberLink number={18559252559} /></p>
            </Grid>
        </React.Fragment>
    )
}