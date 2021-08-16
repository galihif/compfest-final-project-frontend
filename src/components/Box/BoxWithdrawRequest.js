//Library
import React from 'react'

//Styles
import { 
    Button,
    Badge,
    Row,
    Col,
    Container,
 } from 'react-bootstrap';

//Assets


const BoxWithdrawRequest = (props) => {
    return (
        <Container className="topup-history-box  p-3 my-2" style={{backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Row>
                <h6>{props.title}</h6>
            </Row>
            <Row>
                <h6 className="text-success">+Rp {props.amount}</h6>
            </Row>
            <Row>
                <Col lg="6">
                    <p className="m-0" >{props.date}</p>
                </Col>
                <Col lg="6" className="d-flex justify-content-end">
                    {
                        props.status === "PENDING" ? (
                            <div>
                                <Badge bg="secondary">Pending</Badge>
                            </div>
                        ) : props.status === "VERIFIED" ? (
                            <div>
                                <Badge bg="success">Verified</Badge>
                            </div>
                        ) : (
                            <div>
                                <Badge bg="danger">Rejected</Badge>
                            </div>
                        )
                    }
                    
                </Col>
            </Row>
        </Container>
    )
}

export default BoxWithdrawRequest