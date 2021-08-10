//Library
import React from 'react'
import { useHistory } from 'react-router-dom'

//Styles
import './CampaignCard.scss'
import {
    Button,
    ProgressBar,
    Row,
    Col,
    Badge,
    Card
} from 'react-bootstrap';

const CardCampaignRequest = () => {
    const history = useHistory()
    return(
        <Card className="campaign-card" style={{ width: "20em" }} onClick={() => history.push('/campaign')} >
            <Card.Img variant="top" src="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg" style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>Help Poor People in India</Card.Title>
                <Row>
                    <p><b>Target</b> : Rp 100.000.000</p>
                </Row>
                <Row>
                    <Col lg="auto">
                        <Button variant="outline-danger" size="sm">Delete</Button>
                    </Col>
                    <Col>
                        <Badge bg="secondary">Pending</Badge>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardCampaignRequest