//Library
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Config
import API from '../config/API';

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
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()



    //Method
    const handleChange = (e) => {
        switch (e.target.id) {
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

    const handleLogin = () => {
        const body = {
            email: email,
            password: password
        }
        const headers = {
            Accept: "application/json",
        }
        API.login(body,headers)
            .then((res) => {
                dispatch({ type: 'LOGIN', userToken: res.data })
                getUserRole(res.data.access)
            })
    }

    const getUserRole = (accessToken) => {
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        API.getCurrentUser(headers)
            .then((res) => {
                dispatch({ type: 'SETUSERDATA', userData: res.data })
                const role = res.data.role
                const isStaff = res.data.isStaff
                if(isStaff){
                    //TODO
                } else {
                    switch (role) {
                        case "DONATUR":
                            history.push('/dashboarddonor')
                            break
                        case "FUNDRAISER":
                            history.push('/dashboardfundraiser')
                            break
                        default:
                            break
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="login-container m-5 p-5" style={{ width: "48em", backgroundColor: "white", borderRadius: "1em" }}>
                <Row className="">
                    <Col lg={5}>
                        <h5 className="title text-start mb-4">Login</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                                <Form.Text className="text-primary">
                                    <Nav.Link className="p-0" href="/">Forgot Password?</Nav.Link>
                                </Form.Text>
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="" onClick={handleLogin}>
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