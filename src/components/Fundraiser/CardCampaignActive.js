//Library
import React from 'react'
import { useHistory } from 'react-router-dom'

//Styles
import '../Card.scss'
import {
    ProgressBar,
    Row,
    Col,
    Card
} from 'react-bootstrap';

const CardCampaignActive = (props) => {
    const history = useHistory()
    const percentage = (props.amount/props.targetAmount)*100
    return(
        <Card className="fundraiser-campaign-card" style={{ width: "20em" }} onClick={() => history.push(`/campaign/${props.id}`)} >
            <Card.Img variant="top" src={props.imageURL} style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <ProgressBar now={percentage} style={{ height: "0.8em" }} />
                <Row>
                    <Col lg={6}>
                        <p className="text-start m-0" style={{ fontSize: "12px" }}>Rp. {props.amount}</p>
                        <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-end m-0" style={{ fontSize: "12px" }}>Rp. {props.targetAmount}</p>
                        <p className="text-end fw-bold" style={{fontSize:"12px"}}>Target</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardCampaignActive