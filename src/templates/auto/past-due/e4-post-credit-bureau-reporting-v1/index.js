import React from 'react'
import Grid from '../../../../components/Grid'
import NumberLink from '../../../../components/NumberLink'
import PreHeader from '../../../../components/PreHeader'
import Jinja from '../../../../components/Jinja'
import Link from '../../../../components/Link'

export default function Template() {
    return (
        <React.Fragment>
            <PreHeader>Let us know how we can help.</PreHeader>
            <Grid role="presentation" className="table" cellSpacing={0} cellPadding={0}>
                <Grid.Row>
                    <Grid role="presentation" className="table" cellSpacing={0} cellPadding={0}>
                        <Grid.Row>
                            <Grid.Column className="mobileTitle" style={{
                                backgroundColor: '#19988A'
                            }}>
                                Ally Auto Alert
                            </Grid.Column>
                            <Grid.Column style={{
                                borderBottom: '2px solid #4a0246',
                                backgroundColor: '#650360', 
                                width:88
                            }}>
                                <img 
                                    src="http://image.alerts.ally.com/lib/fed215777767047d/m/1/allyAlertLogoV5.png" alt="Ally"
                                    className="ally-header-img"
                                    width={88}
                                    height={59}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
                <Grid.Row> 
                    <p style={{padding: "10px 20px", margin: 0}}>
                        <span className="mobile-hidden">Hello, </span>
                        <Jinja>UserAttribute.Name</Jinja>
                    </p>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{
                        backgroundColor: '#eee',
                        borderTop: "2px solid #cccdcd",
                        padding: "15px 20px"
                    }}>
                        <p style={{
                            fontSize: 25, 
                            fontFamily: "Arial, Helvetica, Geneva, sans-serif",
                            color: "#650360",
                            margin: "15px 0px"
                        }}>
                            We want to help you stay on track.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.DividerRow />
                <Grid.Column style={{
                    backgroundColor: "#eee",
                    textAlign: "left"
                }}>
                    <Grid 
                        role="presentation"
                        border={0} 
                        cellSpacing={0} 
                        cellPadding={5} 
                        style={{
                            width: "70%",
                        }}
                    >
                        <Grid.Row style={{
                            verticleAlign: "top",
                            paddingLeft: 20,
                            color: "#505050 !important",
                            fontSize: 16
                        }}>
                            <Grid.Column style={{
                                paddingTop: 20,
                                paddingLeft: 20
                            }}>
                                <nobr>
                                    Account ending in:
                                </nobr>
                            </Grid.Column>
                            <Grid.Column style={{
                                paddingTop: 20
                            }}>
                                <nobr>
                                    ***-****-
                                    <Jinja>
                                        EventAttribute['redactedAgreementNumber']
                                    </Jinja>
                                </nobr>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{
                            verticleAlign: "top",
                            paddingLeft: 20,
                            color: "#505050 !important",
                            fontSize: 16
                        }}>
                            <Grid.Column style={{
                                paddingTop: 5,
                                paddingLeft: 20,
                                paddingBottom: 20
                            }}>
                                <nobr>
                                    Date:
                                </nobr>
                            </Grid.Column>
                            <Grid.Column style={{
                                paddingBottom: 20,
                                paddingTop: 5
                            }}>
                                <nobr>
                                    <Jinja>
                                    EventAttribute['dateOfStatement']|dateFormatter('%-m/<span>%-d</span>/%Y')
                                    </Jinja>
                                </nobr>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.DividerRow />
                <Grid.Column style={{
                    textAlign: "left",
                    backgroundColor: "#eee",
                    padding: "25px 20px"
                }}>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        Need assistance catching up on your payments? We can help you get back on track. Log in at <Link href="https://www.ally.com/auto/">ally.com/auto</Link> or call us at <NumberLink className="link" number={18554772559}>1-855-477-2559</NumberLink> to make your payment or view other payment options.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        <strong>Let us know if you need further help.</strong>
                        <br />
                        If you’re experiencing or expect to face financial hardship, we may be able to help, but know that our short- and long-term assistance offers require upfront payments. After logging in, select a vehicle from your <strong>Snapshot</strong> and navigate to <strong>Explore payment assistance</strong> for more information.
                    </p>
                    
                </Grid.Column>
                <Grid.DividerRow />
                <Grid.Column  style={{
                        backgroundColor: "#eee",
                        padding: "30px 20px",
                        fontSize: 15
                    }}>

                    <Grid style={{
                        width: "100%"
                    }}>
                        <Grid.Row>
                            <Grid.Column style={{
                                verticalAlign: "middle",
                                textAlign: "left",
                                paddingRight: 22,
                                fontSize: 14
                            }}>
                                <p style={{ margin: 0 }}>
                                    <strong>
                                        Questions?
                                    </strong>
                                </p>
                            </Grid.Column>
                            <Grid.Column style={{
                                verticalAlign: "middle",
                                textAlign: "left",
                                borderLeft: "1px solid #999",
                                paddingLeft: 28,
                                paddingRight: 22,
                                fontSize: 14,
                                width: "51%"
                            }}>
                                <span>
                                    <nobr>
                                        Call us at <NumberLink number={18774772559}>1-877-477-2559</NumberLink>
                                    </nobr>
                                    <br />
                                    <nobr>
                                        <span style={{
                                            whiteSpace: "nowrap"
                                        }}>
                                            Available Mon - Sun, 8 am - 8 pm ET
                                        </span>
                                    </nobr>
                                </span>
                            </Grid.Column>
                            <Grid.Column style={{
                                verticalAlign: "middle",
                                textAlign: "left",
                                borderLeft: "1px solid #999",
                                paddingLeft: 28,
                                paddingRight: 22,
                                fontSize: 14
                            }}>
                                <p style={{ margin: 0 }}>
                                    Access Ally Auto at
                                </p>
                                <Link href="https://www.ally.com/auto/" title="Call us" alias="Ally Auto">ally.com/auto</Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column style={{
                    textAlign: "left",
                    backgroundColor: "#d8d8d8",
                    padding: "30px 20px"
                }}>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        You're receiving this account servicing email as a valued Ally Auto customer.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        Please do not reply to this email.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        If you'd like to stop receiving collection emails, call us at <NumberLink number={18554772559}>1-855-477-2559</NumberLink>, send a secure message, or chat with us online.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        Concerned about a suspicious email that appears to be from Ally Auto? Call us at <NumberLink number={18889252559}>1-888-925-2559</NumberLink> and we'll investigate.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        Ally Financial, <a href=" " style={{
                            textDecoration: "none",
                            cursor: "default",
                            color: "#2a2a2a"
                        }}>
                            <span>P.O. Box 380901, Bloomington, MN 55438</span>
                        </a>
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        <a href=" " style={{
                            textDecoration: "none",
                            cursor: "default",
                            color: "#2a2a2a"
                        }}>
                            <span>©2009 - <Jinja>'%Y'|today('EST')</Jinja></span>
                        </a> Ally Financial Inc. Ally is a registered service mark.
                    </p>
                    <p style={{ margin: 0, marginBottom: "1rem" }}>
                        Email ID: e4-post-credit-bureau-reporting (v1)
                    </p>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    )
}