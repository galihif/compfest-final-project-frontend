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
import headerImage from '../../assets/headerImage.svg'


const Header = (props) => {
    return (
        <Container className="header-container m-0" fluid>
            <Row className="p-5">
                <Col lg={6} className="d-flex align-items-center">
                    <div>
                        <h3 className="">Help Others With Sharing</h3>
                        <p>Donate will never make you poor</p>
                        {
                            !props.isLogged ? (
                                <div>
                                    <Button variant="primary me-3" href="/registerdonor">Be a Donor</Button>
                                    <Button variant="outline-primary" href="/registerfundraiser">Be a Fundraiser</Button>
                                </div>
                            ) : null
                        }
                    </div>
                </Col>
                <Col lg={6}>
                    <Image src={headerImage} />
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