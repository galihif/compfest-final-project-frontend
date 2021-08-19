//Library
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    Image,
    Breadcrumb,
} from 'react-bootstrap';
import { useEffect } from 'react';
import API from '../../config/API';
import { useCallback } from 'react';


//Assets

const AdminProposalCampaignDetails = () => {
    //State
    const {id} = useParams();
    const [respond, setRespond] = useState({
        target_amount:0,
        proposal_text:"",
        description:"",
        target_amount:"",
        title:"",
        image_url:""
    });

    const [fundraiser, setFundraiser] = useState({
        email:"",
        full_name:""
    });

    const history = useHistory();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;


    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getProposalCampaigns()
    },[])
    //Method
    const getProposalCampaigns = useCallback((e) => {
        console.log(e);
        API.getCampaignProposalById(id,headers)
            .then((res) => {
                const amountData = new Intl.NumberFormat('de-DE').format(res.data.target_amount);
                setRespond({...res.data, target_amount:amountData});
                setFundraiser(res.data.fundraiser)
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
                dispatch({ type: 'REFRESH', userToken: res.data });
            })
            .catch((err) => {
                console.log(err, "ref");
            })
    }

    const handleAccept = () =>{
        const body = {
            id:id,
            status:"VERIFIED"
        }
        sendRequest(body);
    }
    const handleReject = () =>{
        const body = {
            id:id,
            status:"REJECTED"
        }
        sendRequest(body);
    }

    const sendRequest = (body) => {
        API.putAcceptCampaign(id,body,headers)
            .then((res) => {
                if(res.status === 204){
                    alert('Campaign successfully ' + body.status);
                }
                else{
                    alert('Something Went Wrong');
                }
                
                history.push('/admin/campaign');
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken();
                }
                else{
                    alert('Something Went Wrong');
                }
            })
    }


    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Campaign</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="login-container  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Image src={respond.image_url} rounded style={{ width: "100%" }} />
                    <Container>
                        <h4 className="my-3">{respond.title}</h4>
                        <Row className="my-3">
                            <Col lg={6}>
                                <p className="fw-bold" style={{ fontSize: "16px" }}>Target</p>
                            </Col>
                            <Col lg={6}>
                                <p style={{ fontSize: "16px" }}>Rp. {respond.target_amount}</p>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <p className="fw-bold">Fundraiser</p>
                            <Col lg={1}>
                                <Gravatar email={fundraiser.email} size="30" style={{ borderRadius: "20em" }} />
                            </Col>
                            <Col className="d-flex align-items-center">
                                <p className="my-0 me-2">{fundraiser.full_name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0673A1" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </Col>
                        </Row>
                        <p className="mt-2 mb-0 fw-bold" style={{ fontSize: "16px" }}>Email</p>
                        <p className="">{fundraiser.email}</p>

                        <p>
                            {respond.description}
                        </p>
                        <Row >
                            <Col lg={6}>
                                <Button className="w-100" variant="primary" type="submit" onClick={() => handleAccept()}>
                                    Accept
                                </Button>
                            </Col>
                            <Col lg={6}>
                                <Button className="w-100" variant="danger" type="submit" onClick={() => handleReject()}>
                                    Reject
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        </div>
    )
}

export default AdminProposalCampaignDetails