//Library
import React from 'react'

//Styles
import './Header.scss'//Styles
import { 
    Button,
    Badge,
    Row,
    Col,
    Container,
 } from 'react-bootstrap';

//Assets


const TopUpHistoryBox = () => {
    return (
        <Container className="topup-history-box  p-3 my-2" style={{ width: "32em", backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Container>
                <Row>
                    <Col lg={6}>
                        <h6>+Rp 900.000</h6>
                        <p className="m-0">22/02/2022</p>
                    </Col>
                    <Col lg={6} className="justify-content-end d-flex">
                        <div>
                            <Badge bg="secondary">Pending</Badge>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default TopUpHistoryBox