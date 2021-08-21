//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container} from 'react-bootstrap'
import API from '../../config/API'
import AdminCampaignProposalCard from '../../components/Card/Admin/AdminCampaignProposalCard';

const CampaignProposals = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;
    

    const [fundraiserRequest, setFundraiserRequest] = useState([]);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getCampaignProposals()
    },[])

    const getCampaignProposals = useCallback((e) => {

        API.getListCampaignProposal(headers)
            .then((res) => {
                setFundraiserRequest(res.data);
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })
    }, [fundraiserRequest])

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

    return(
        <Container className="m-0" fluid>
            <Row className="px-5 d-flex justify-content-center">
                {
                    fundraiserRequest.map((proposal,index) => {
                        console.log(proposal);
                        return (
                            <AdminCampaignProposalCard 
                                key={index}
                                id={proposal.id}
                                title={proposal.title}
                                email={proposal.fundraiser.email}
                                target={proposal.target_amount}
                                name={proposal.fundraiser.full_name}
                                imageLink={proposal.image_url}
                            />
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default CampaignProposals