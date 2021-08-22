//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container, Spinner, Col, Image} from 'react-bootstrap'
import API from '../../config/API'
import AdminCampaignProposalCard from '../../components/Card/Admin/AdminCampaignProposalCard';
import empty from '../../assets/adminEmptyArray.svg'

const CampaignProposals = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;
    
    const [loading, setLoading] = useState(true);
    const [campaignRequest, setFundraiserRequest] = useState([]);

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
            .finally(()=>{
                setLoading(!loading);
            })
    }, [campaignRequest])

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
            <h2 className="text-center m-5">Campaign</h2>
            <Row className="px-5 d-flex justify-content-center">
                {loading? 
                <Spinner animation="grow" className="m-3" style={{width:"200px", height:"200px"}}/>:
                ""
                }
                {
                    campaignRequest.map((proposal,index) => {
                        return (
                            <AdminCampaignProposalCard 
                                key={index}
                                id={proposal.id}
                                title={proposal.title}
                                email={proposal.fundraiser.email}
                                target={proposal.target_amount}
                                name={proposal.fundraiser.full_name}
                                date={proposal.created_at}
                                imageLink={proposal.image_url}
                            />
                        )
                    })
                }
                {
                    (!loading && campaignRequest.length ===0 )? 

                    <Col lg={6}>
                        <h4 className='text-center'>It Is Empty</h4>
                        <Image src={empty} fluid/>
                    </Col>
                    :""
                }
            </Row>
        </Container>
    )
}

export default CampaignProposals