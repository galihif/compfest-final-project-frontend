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


const BoxWithdrawRequest = () => {
    return (
        <Container className="topup-history-box  p-3 my-2" style={{backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Row>
                <h6>Help Poor People in India</h6>
            </Row>
            <Row>
                <h6 className="text-success">+Rp 900.000</h6>
            </Row>
            <Row>
                <Col lg="6">
                    <p className="m-0" >20/02/2002</p>
                </Col>
                <Col lg="6" className="d-flex justify-content-end">
                    <div>
                        <Badge bg="secondary">Pending</Badge>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default BoxWithdrawRequest