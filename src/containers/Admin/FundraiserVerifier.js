//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container} from 'react-bootstrap'
import API from '../../config/API'
import AdminFundraiserCard from '../../components/Card/Admin/AdminFundraiserCard';

const FundraiserVerifier = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh
    console.log('test');

    const [fundraiserRequest, setFundraiserRequest] = useState([]);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getFundraiserRequest()
    },[])

    const getFundraiserRequest = useCallback((e) => {
        console.log(e);
        API.getListFundraiser(headers)
            .then((res) => {
                setFundraiserRequest(res.data)
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
                    fundraiserRequest.map((proposal) => {
                        console.log(proposal);

                        return (
                            <AdminFundraiserCard 
                                email={proposal.email}
                                title={proposal.first_name}
                                description={proposal.proposal_text}
                            />
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default FundraiserVerifier