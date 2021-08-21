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
import { useHistory } from 'react-router-dom';



const Header = () => {
    const history = useHistory();
    const routeHandler = (endUrl) => {
        history.push(`/admin/${endUrl}`);
        window.scrollTo(0, 700)

    }
    return (
        <Container className="header-container m-0" fluid>
            <Row className="p-5">
                <Col lg={6} className="d-flex align-items-center">
                    <div>
                        <h3 className="">Help Others</h3>
                        <p>double check to verified/rejecting something</p>
                        <p>Where do you want to go?</p>
    
                        <Col lg={12} className="d-flex align-items-center">
                            <Button variant="outline-primary" className='w-100' onClick={() => routeHandler('campaign')}>Campaign Proposal</Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <Button variant="outline-primary" className='w-100' onClick={() => routeHandler('topup')}>User Topup </Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <Button variant="outline-primary"className='w-100' onClick={() => routeHandler('withdraw')}>Fundraiser Withdraw </Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <Button variant="outline-primary"className='w-100' onClick={() => routeHandler('fundraiser')}>Fundraiser Proposal </Button>
                        </Col>
                    
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