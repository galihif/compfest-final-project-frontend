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

const AdminCampaignProposalCard = (props) => {
    const normalFont = { fontSize: "12px" };
    const { title,
            email,
            target,
            name } = props;
    return(
        <Card className="campaign-card" style={{ width: "20em" }}>
            <Card.Img variant="top" src="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg" style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Row>
                    <Col lg={6}>
                        <p className="fw-bold" style={{fontSize:"12px"}}>Target</p>
                        <p className="fw-bold" style={{fontSize:"12px"}}>Fundraiser</p>
                        <p className="fw-bold" style={{fontSize:"12px"}}>Email</p>
                    </Col>
                    <Col lg={6}>
                        <p style={{fontSize:"12px"}}>{target}</p>
                        <p style={{fontSize:"12px"}}>{name}</p>
                        <p style={{fontSize:"12px"}}>{email}</p>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    )
}

export default AdminCampaignProposalCard