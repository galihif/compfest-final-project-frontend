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


const TopUpHistoryBox = (props) => {
    return (
        <Container className="topup-history-box  p-3 my-2" style={{backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Container>
                <Row>
                    <Col lg={6}>
                        <h6>+Rp {props.amount}</h6>
                        <p className="m-0">{props.date}</p>
                    </Col>
                    <Col lg={6} className="justify-content-end d-flex">
                        <div>
                            {
                                props.status === "PENDING" ? (
                                        <Badge bg="secondary">Pending</Badge>
                                    ) : props.status === "VERIFIED" ? (
                                        <Badge bg="success">Verified</Badge>
                                    ) : (
                                        <Badge bg="danger">Rejected</Badge>
                                    )
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default TopUpHistoryBox