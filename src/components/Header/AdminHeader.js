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
    DropdownButton,
    Dropdown
 } from 'react-bootstrap';

//Assets
import headerImage from '../../assets/adminHeaderImage.jpg'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import API from '../../config/API';


const Header = () => {
    const history = useHistory();

    const routeHandler = (endUrl) => {
        history.push(`/admin/${endUrl}`);
        window.scrollTo(0, 700)
    }
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;
    

    const [notification, setNotification] = useState({
        top_up: '',
        fundraiser_request: '',
        new_campaign: '',
        withdraw_request: '',
    });

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getCampaignProposals()
    },[])

    const getCampaignProposals = useCallback((e) => {
        API.getNotification(headers)
            .then((res) => {
                setNotification(res.data);
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })
    }, [notification])

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
            })
            .catch((err) => {
                console.log(err, "ref")
            })
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
                            <Button variant="outline-primary" className='w-100' onClick={() => routeHandler('topup')}>User Topup</Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <Button variant="outline-primary" className='w-100' onClick={() => routeHandler('withdraw')}>Fundraiser Withdraw</Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <Button variant="outline-primary" className='w-100' onClick={() => routeHandler('fundraiser')}>Fundraiser Proposal</Button>
                        </Col>
                        <Col lg={12} className="d-flex align-items-center mt-2" >
                            <DropdownButton id="dropdown-basic-button" title="Notification">
                                <Dropdown.Item href="#/action-1" onClick={() => routeHandler('campaign')}>Campaign Proposal: {notification.new_campaign} </Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={() => routeHandler('topup')}>User Topup: {notification.top_up}</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={() => routeHandler('withdraw')}>Fundraiser Withdraw: {notification.withdraw_request}</Dropdown.Item>
                                <Dropdown.Item href="#/action-4" onClick={() => routeHandler('fundraiser')}>Fundraiser Proposal: {notification.fundraiser_request}</Dropdown.Item>
                            </DropdownButton>
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