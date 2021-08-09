//Library
import React from 'react'

//Styles
import { 
    Button,
    ProgressBar,
    Row,
    Col,
    Container,
    Card
 } from 'react-bootstrap';

//Assets
import headerImage from '../assets/headerImage.svg'

//Component
import CampaignCard from './CampaignCard';


const FeaturedCampaign = () => {
    return (
        <Container className="m-0" fluid>
            <h4 className="text-center my-5">Featured Campaigns</h4>
            <Row className="px-5 d-flex justify-content-center">
                <Col lg={3} className="d-flex justify-content-center mb-3">
                    <CampaignCard/>
                </Col>
                <Col lg={3} className="d-flex justify-content-center mb-3">
                    <CampaignCard/>
                </Col>
                <Col lg={3} className="d-flex justify-content-center mb-3">
                    <CampaignCard/>
                </Col>
                <Col lg={3} className="d-flex justify-content-center mb-3">
                    <CampaignCard/>
                </Col>
            </Row>
        </Container>
    )
}

export default FeaturedCampaign