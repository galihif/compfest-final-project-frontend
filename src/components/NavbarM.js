//Library
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


//Styles
import {
    Container,
    Navbar,
    Nav,
    Button
} from 'react-bootstrap';

// //Images
// import navbar_logo from '../assets/navbar_logo.png'

const NavbarM = () => {
    const state = useSelector((state) => state)

    //State
    const [isLogged, setLogged] = useState(false)

    //Method
    useEffect(() => {
        
    }, [isLogged])

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
                            <Button variant="outline-primary mx-2" href="/login">Login</Button>
                            <Button variant="primary" href="registerdonor" >Register</Button>
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