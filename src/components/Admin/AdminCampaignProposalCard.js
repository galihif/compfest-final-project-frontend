//Library
import React from 'react'

//Styles
import './Card.scss'
import {
    Button,
    Row,
    Col,
    Card
} from 'react-bootstrap';

const AdminCampaignProposalCard = () => {
    const normalFont = { fontSize: "12px" };
    return(
        <Card className="campaign-card" style={{ width: "20em" }}>
            <Card.Img variant="top" src="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg" style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>Help Poor People in India</Card.Title>
                <Row>
                    <Col lg={6}>
                        <p className="fw-bold" style={{fontSize:"12px"}}>Target</p>
                        <p className="fw-bold" style={{fontSize:"12px"}}>Fundraiser</p>
                    </Col>
                    <Col lg={6}>
                        <p style={{fontSize:"12px"}}>Rp.100.000.000</p>
                        <p style={{fontSize:"12px"}}>Joko Widodo</p>
                    </Col>

                </Row>
                <Row>
                    <Col lg={4}>
                        <Button variant="primary" style={normalFont}>
                            Accept
                        </Button>
                    </Col>
                    <Col lg={4}>
                        <Button variant="outline-primary" style={normalFont}>
                            Details
                        </Button>
                    </Col>
                    <Col lg={4}>
                        <Button variant="danger" style={normalFont}>
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AdminCampaignProposalCard