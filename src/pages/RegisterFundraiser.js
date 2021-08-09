//Library
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    FormControl,
    Form,
    Image,
    Nav
} from 'react-bootstrap';


//Assets
import authImage from '../assets/authImage.svg'

const RegisterFundraiser = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="login-container m-5 p-5" style={{ width: "48em", backgroundColor: "white", borderRadius: "1em" }}>

                <Row className="">
                    <Col lg={5}>
                        <h5 className="title text-start mb-4">Register To Make Campaign</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="last_name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Register as Fundraiser
                                </Button>
                                <Nav.Link className="text-center" href="/login">Login</Nav.Link>
                            </div>
                        </Form>
                    </Col>
                    <Col lg={7} className="d-flex justify-content-center">
                        <Image src={authImage} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterFundraiser