//Library
import React from 'react'

//Styles
import './Header.scss'//Styles
import { 
    Button,
    Image,
    Row,
    Col,
    Container,
 } from 'react-bootstrap';

//Assets


const DonationHistoryBox = () => {
    return (
        <Container className="donation-history-box  p-3 my-2" style={{ width: "32em", backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Container>
                <Row>
                    <Col lg={6}>
                        <h6>Help Poor People in India</h6>
                        <p className="m-0">22/02/2022</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-success text-end">Rp. 290.000</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default DonationHistoryBox