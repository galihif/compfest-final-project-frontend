//Library
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Gravatar from 'react-gravatar'


//Styles
import {
    Container,
    Navbar,
    Nav,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import API from '../config/API';
import './NavbarM.scss'

// //Images
// import navbar_logo from '../assets/navbar_logo.png'

const NavbarM = (props) => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh
    const [isLogged, setLogged] = useState(state.isLogged)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const dashboardPath = role === 'DONATUR' ? "/dashboarddonor" : "/dashboardfundraiser"

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }


    //Method
    useEffect(() => {
        
    })

    const getUserData = () => {
        API.getCurrentUser(headers)
            .then((res) => {
                const userData = res.data
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setRole(userData.role)
                setLogged(true)
            })
            .catch((err) => {
                console.log(err)
                setLogged(false)
                refreshUserToken()
            })
    }

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                // console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
                setLogged(true)
            })
            .catch((err) => {
                setLogged(false)
            })
    }
    
    if(state.isLogged){
        getUserData()
        // console.log(state.isLogged, "nav")
    } else {
        // console.log(state.isLogged,"nav")
        // setLogged(false)
    }

    const navLogged = 
    <Row>
        <Col className="d-flex nav-user" onClick={() => history.push(dashboardPath)}>
            <Gravatar email={email} size="30" style={{ borderRadius: "20em" }} />
            <p className="my-0 ms-2 fs-5" >{firstName} {lastName}</p>
        </Col>
    </Row>
    const navNotLogged = 
    <div>
        <Button variant="outline-primary mx-2" href="/login">Login</Button>
        <Button variant="primary" href="registerdonor" >Register</Button>
    </div>

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light fixed-top">
                <Container>
                    <Navbar.Brand href="/">Website Name</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                isLogged ? navLogged : navNotLogged
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{visibility:"hidden"}}>
                <Container>
                    <Navbar.Brand href="/">Website Name</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="outline-primary mx-2">Login</Button>
                            <Button variant="primary">Register</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarM