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


const DonationHistoryBox = (props) => {
    return (
        <Container className="donation-history-box  p-3 my-2" style={{ backgroundColor: "white", borderRadius: "0.8em", border: "1px solid #DFDFDF" }}>
            <Container>
                <Row>
                    <Col lg={6}>
                        <h6>{props.campaign}</h6>
                        <p className="m-0">{props.date}</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-success text-end">Rp. {props.amount}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default DonationHistoryBox