//Library
import React, { useState } from 'react'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    Breadcrumb,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../config/API';
import { useCallback } from 'react';
import { useEffect } from 'react';


//Assets

const AdminFundraiserDetails = () => {
    //State
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [respond, setRespond] = useState({
        first_name:"",
        last_name:"",
        email:"",
        proposal_text:"",
        date_joined:""
    });

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;
    const history = useHistory();


    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getFundraiserRequest()
    },[])

    const getFundraiserRequest = useCallback((e) => {
        console.log(e);
        API.getFundraiserByIdAdmin(id,headers)
            .then((res) => {
                setRespond(res.data);
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })
    }, [respond])

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                dispatch({ type: 'REFRESH', userToken: res.data })
            })
            .catch((err) => {
                console.log(err, "ref")
            })
    }


    //Method
    const handleAccept = () =>{
        const body = {
            id:id
        }
        API.putAcceptFundraiser(body,headers)
            .then((res) => {
                alert(res);
                history.push('/fundraiser');
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })

    }
    const handleReject = () =>{
        
    }

    //Component
    const acceptButton = 
        <Button variant="primary" type="submit" className="w-50" onClick={() => handleAccept()}>
            Accept
        </Button>
    const rejectButton = 
        <Button variant="danger" type="submit" className="w-50" onClick={() => handleReject()}>
            Reject
        </Button>

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                    <Breadcrumb.Item active>Fundraiser Details</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="login-container  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Row>
                        <Col className="d-flex align-items-center">
                            <Gravatar email={respond.email} size={200} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
                        </Col>
                    </Row>
                    <Container>
                        <h4 className="my-3">{respond.first_name + " " + respond.last_name}</h4>
                        <h5 className="my-3">{respond.email}</h5>
                        <p>
                            {respond.proposal_text}
                        </p>
                        <Row>
                            <Col lg={6} className="text-center">
                                {acceptButton}
                            </Col>
                            
                            <Col lg={6} className="text-center">
                                {rejectButton}
                            </Col>
                        </Row>
                    </Container>
                </Container>
                {/* {dialogLogged} */}
            </div>
        </div>
    )
}

export default AdminFundraiserDetails