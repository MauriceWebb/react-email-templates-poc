import React from 'react'
import Grid from '../../components/Grid'
import NumberLink from '../../components/NumberLink'
import PreHeader from '../../components/PreHeader'
// import jsonStyles from './styles.json'

// console.log('jsonStyles:', jsonStyles)

export default function Hello() {
    console.log(this)
    return (
        <React.Fragment>
            <PreHeader className="pre-header" text="This is a preheader with hidden text" />
            <Grid>
                <h1 className="header-class">Hello Ally-Templates 👋🏾</h1>
                <p className="extra-class">Reach us at: <NumberLink number={18559252559} /></p>
            </Grid>
        </React.Fragment>
    )
}