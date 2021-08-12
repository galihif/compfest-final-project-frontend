//Library
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

//Confid
import API from '../config/API/index'

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

const RegisterDonor = () => {
    //State
    const history = useHistory()
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //Method
    const handleChange = (e) => {
        switch (e.target.id) {
            case "firstName":
                setFirstName(e.target.value)
                break
            case "lastName":
                setLastName(e.target.value)
                break
            case "email":
                setEmail(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    const handleRegisterDonor = () => {
        const body = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            role: "DONATUR"
        }
        const headers = {
            Accept: "application/json",
        }
        API.register(body, headers)
            .then((res) => {
                dispatch({ type: 'LOGIN', userToken: res.data })
                getUserData(res.data.access)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUserData = (accessToken) => {
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        API.getCurrentUser(headers)
            .then((res) => {
                dispatch({ type: 'SETUSERDATA', userData: res.data })
                history.push('/dashboarddonor')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="login-container m-5 p-5" style={{ width: "60em", backgroundColor: "white", borderRadius: "1em" }}>

                <Row className="">
                    <Col lg={5}>
                        <h5 className="title text-start mb-4">Register To Help Others</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="firstName" onChange={handleChange}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName" onChange={handleChange}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="" onClick={handleRegisterDonor}>
                                    Register as Donor
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

export default RegisterDonor