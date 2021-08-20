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
import API from '../../config/API';
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


    const userData = props.userData
    const [firstName, setFirstName] = useState(userData.first_name)
    const [lastName, setLastName] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [role, setRole] = useState(userData.role)
    const dashboardPath = role === 'DONATUR' ? "/dashboarddonor" : "/dashboardfundraiser"

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    

    //Method
    useEffect(() => {
    })

    const navLogged = 
    <Row>
        <Col className="d-flex nav-user" onClick={() => history.push(dashboardPath)}>
            <Gravatar email={props.userData.email} size="30" style={{ borderRadius: "20em" }} />
            <p className="my-0 ms-2 fs-5" >{props.userData.first_name} {props.userData.last_name}</p>
        </Col>
    </Row>
    const navNotLogged = 
    <div>
        <Button variant="outline-primary mx-2" href="/login">Login</Button>
        <Button variant="primary" href="/registerdonor" >Register</Button>
    </div>

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light fixed-top">
                <Container>
                    <Navbar.Brand href="/">NagaPeduli</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                props.isLogged ? navLogged : navNotLogged
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

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData
    };
}

export default connect(mapStateToProps)(NavbarM)