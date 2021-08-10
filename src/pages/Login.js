//Library
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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

const Login = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    console.log(state.userToken, "login")

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="login-container m-5 p-5" style={{ width: "48em", backgroundColor: "white", borderRadius: "1em" }}>
                <Row className="">
                    <Col lg={5}>
                        <h5 className="title text-start mb-4">Login</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <Form.Text className="text-primary">
                                    <Nav.Link className="p-0" href="/">Forgot Password?</Nav.Link>
                                </Form.Text>
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                                <Nav.Link className="text-center" href="/registerdonor">Register</Nav.Link>
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

export default Login