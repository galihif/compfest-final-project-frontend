//Library
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    Tabs,
    Tab,
    Breadcrumb
} from 'react-bootstrap';


//Assets
import DonationHistoryBox from '../components/DonationHistoryBox';
import TopUpHistoryBox from '../components/TopUpHistoryBox';
import CampaignCard from '../components/CampaignCard';
import CardCampaignRequest from '../components/CardCampaignRequest';
import BoxWithdrawRequest from '../components/BoxWithdrawRequest';

const DashboardFundraiser = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="dashboard-box  p-3" style={{ width: "64em" }}>
                    <Container  >
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center">
                                <h5 className="my-0 mx-2">Fundraiser Dashboard</h5>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col className="d-flex justify-content-center">
                                <Gravatar email="jokowi@pdip.com" size="120" style={{ borderRadius: "20em" }} />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col className="d-flex justify-content-center align-items-center">
                                <p className="my-0 me-1 fs-5" >Joko Widodo</p>
                            </Col>
                        </Row>
                        <Row className="my-3 d-flex justify-content-center">
                            <Col lg={1} className="mx-3">
                                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.0311 0C35.9289 0 40 3.96919 40 10.7636H31.5378V10.8329C27.6104 10.8329 24.4267 13.937 24.4267 17.766C24.4267 21.595 27.6104 24.6991 31.5378 24.6991H40V25.3231C40 32.0308 35.9289 36 29.0311 36H10.9689C4.07111 36 0 32.0308 0 25.3231V10.6769C0 3.96919 4.07111 0 10.9689 0H29.0311ZM38.5067 13.7448C39.3314 13.7448 40 14.3967 40 15.2008V20.2619C39.9904 21.0621 39.3274 21.7085 38.5067 21.7179H31.6978C29.7096 21.7439 27.971 20.4167 27.52 18.5286C27.2942 17.3566 27.6112 16.1471 28.3861 15.2244C29.1611 14.3017 30.3147 13.7601 31.5378 13.7448H38.5067ZM32.4978 16.0847H31.84C31.4362 16.0801 31.0472 16.2333 30.76 16.5101C30.4727 16.7869 30.3111 17.1643 30.3111 17.558C30.3111 18.3841 30.9928 19.0565 31.84 19.066H32.4978C33.3422 19.066 34.0267 18.3986 34.0267 17.5753C34.0267 16.7521 33.3422 16.0847 32.4978 16.0847ZM20.7644 7.78238H9.47556C8.63807 7.78232 7.95641 8.43919 7.94667 9.25566C7.94667 10.0817 8.62831 10.7541 9.47556 10.7636H20.7644C21.6088 10.7636 22.2933 10.0962 22.2933 9.27299C22.2933 8.44975 21.6088 7.78238 20.7644 7.78238Z" fill="#0673A1" />
                                </svg>
                            </Col>
                            <Col lg="auto" className="d-flex align-items-center" >Rp. 100.000</Col>
                        </Row>
                        <Row className="my-3">
                            <Col className="d-flex justify-content-center">
                                <Button variant="primary" size="sm">Make a Campaign</Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="my-3">
                    <Tab eventKey="home" title="Donation History">
                        <Row className="d-flex justify-content-start px-2">
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CampaignCard/>
                            </Col>
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CampaignCard/>
                            </Col>
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CampaignCard/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="campaignRequest" title="Campaign Request">
                        <Row className="d-flex justify-content-start px-2">
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CardCampaignRequest />
                            </Col>
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CardCampaignRequest />
                            </Col>
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CardCampaignRequest />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="withdrawRequest" title="Withdrawal Request">
                        <Row className="d-flex justify-content-start px-2">
                            <Col lg={3} className="d-flex justify-content-center mb-2">
                                <BoxWithdrawRequest/>
                            </Col>
                            <Col lg={3} className="d-flex justify-content-center mb-2">
                                <BoxWithdrawRequest/>
                            </Col>
                            <Col lg={3} className="d-flex justify-content-center mb-2">
                                <BoxWithdrawRequest/>
                            </Col>
                            <Col lg={3} className="d-flex justify-content-center mb-2">
                                <BoxWithdrawRequest/>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default DashboardFundraiser