//Library
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    ProgressBar,
    Form,
    Image,
    Breadcrumb
} from 'react-bootstrap';


//Assets
import authImage from '../assets/authImage.svg'

const CampaignDetails = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Campaign</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="login-container  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Image src="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg" rounded style={{ width: "100%" }} />
                    <Container>
                        <h4 className="my-3">Help Poor People in India</h4>
                        <ProgressBar now={10} />
                        <Row className="my-3">
                            <Col lg={6}>
                                <p className="text-start m-0" style={{ fontSize: "16px" }}>Rp. 10.000.000</p>
                                <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                            </Col>
                            <Col lg={6}>
                                <p className="text-end m-0" style={{ fontSize: "16px" }}>Rp.100.000.000</p>
                                <p className="text-end fw-bold" style={{ fontSize: "12px" }}>Target</p>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <p>Fundraiser</p>
                            <Col lg={1}>
                                <Gravatar email="jokowi@pdip.com" size="30" style={{ borderRadius: "20em" }} />
                            </Col>
                            <Col className="d-flex align-items-center">
                                <p className="my-0 me-2">Joko Widodo</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0673A1" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </Col>
                        </Row>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in th.
                        </p>
                        <Row className="d-grid my-2">
                            <Button variant="primary" type="submit">
                                DONATE
                            </Button>
                        </Row>
                    </Container>
                </Container>
            </div>
        </div>
    )
}

export default CampaignDetails