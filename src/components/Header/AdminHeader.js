//Library
import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'

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
import headerImage from '../../assets/adminHeaderImage.jpg'


const Header = () => {
    return (
        <Container className="header-container m-0" fluid>
            <Row className="p-5">
                <Col lg={6} className="d-flex align-items-center">
                    <div>
                        <h3 className="">Help Others</h3>
                        <p>double check to verified/rejecting something</p>
                    </div>
                </Col>
                <Col lg={6} md={4}>
                    <Image src={headerImage} fluid/>
                </Col>
            </Row>
        </Container>
    )
}


function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData
    };
}

export default connect(mapStateToProps)(Header)