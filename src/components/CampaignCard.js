//Library
import React from 'react'

//Styles
import './CampaignCard.scss'
import {
    Button,
    ProgressBar,
    Row,
    Col,
    Container,
    Card
} from 'react-bootstrap';

const CampaignCard = () => {
    return(
        <Card className="campaign-card" style={{ width: "20em" }}>
            <Card.Img variant="top" src="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg" style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>Help Poor People in India</Card.Title>
                <ProgressBar now={10} style={{ height: "0.8em" }} />
                <Row>
                    <Col lg={6}>
                        <p className="text-start m-0" style={{ fontSize: "12px" }}>Rp. 10.000.000</p>
                        <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-end m-0" style={{fontSize:"12px"}}>Rp.100.000.000</p>
                        <p className="text-end fw-bold" style={{fontSize:"12px"}}>Target</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CampaignCard