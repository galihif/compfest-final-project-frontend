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
import API from '../config/API';

const RegisterFundraiser = () => {
    //State
    const history = useHistory()
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [proposalText, setProposalText] = useState("")

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
            case "proposalText":
                setProposalText(e.target.value)
                break
            default:
                break
        }
    }

    const handleRegisterFundraiser = () => {
        setLoading(true)
        const body = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            role: "FUNDRAISER",
            proposal_text: proposalText
        }
        const headers = {
            Accept: "application/json",
        }
        if(firstName === "" || lastName === "" || password === "" || email === ""||proposalText===""){
            alert("Please fill all the form")
        } else {
            API.register(body, headers)
                .then((res) => {
                    dispatch({ type: 'LOGIN', userToken: res.data })
                    getUserData(res.data.access)
                })
                .catch((err) => {
                    setLoading(false)
                    const message = err.response.data[Object.keys(err.response.data)[0]]
                    alert(message)
                })
        }
    }

    const getUserData = (accessToken) => {
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        API.getCurrentUser(headers)
            .then((res) => {
                dispatch({ type: 'SETUSERDATA', userData: res.data })
                history.push('/dashboardfundraiser')
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                const message = err.response.data[Object.keys(err.response.data)[0]]
                alert(message)
            })
    }


    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="login-container m-5 p-5" style={{ width: "60em", backgroundColor: "white", borderRadius: "1em" }}>

                <Row className="">
                    <Col lg={5}>
                        <h5 className="title text-start mb-4">Register To Make Campaign</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="firstName" onChange={handleChange}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name"/>
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
                            <Form.Group className="mb-3" controlId="proposalText" onChange={handleChange}>
                                <Form.Label>Why do you want to be a fundraiser?</Form.Label>
                                <Form.Control type="text" as="textarea" placeholder="Add Reason" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit" onClick={handleRegisterFundraiser} disable={loading} >
                                    {
                                        loading ? (
                                            <div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div>
                                                Register as Fundraiser
                                            </div>
                                        )
                                    }
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