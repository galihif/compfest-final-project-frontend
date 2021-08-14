//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Styles
import '../Card.scss'
import {
    Button,
    ProgressBar,
    Row,
    Col,
    Badge,
    Card
} from 'react-bootstrap';

const CardCampaignRequest = (props) => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    return(
        <Card className="" style={{ width: "20em" }}>
            <Card.Img variant="top" src={props.imageURL} style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Row>
                    <p><b>Target</b> : Rp {props.targetAmount}</p>
                </Row>
                <Row>
                    <Col lg="auto">
                        <Button variant="outline-danger" size="sm">Delete</Button>
                    </Col>
                    <Col>
                        {
                            props.status === "PENDING" ? (
                                <Badge bg="secondary">Pending</Badge>
                            ) : props.status === "VERIFIED" ? (
                                <Badge bg="success">Verified</Badge>
                            ) : (
                                <Badge bg="danger">Rejected</Badge>
                            )
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardCampaignRequest