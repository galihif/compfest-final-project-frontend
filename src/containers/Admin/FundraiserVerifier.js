//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Spinner, Image} from 'react-bootstrap'
import API from '../../config/API'
import AdminFundraiserCard from '../../components/Card/Admin/AdminFundraiserCard';
import empty from '../../assets/adminEmptyArray.svg'


const FundraiserVerifier = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;

    const [fundraiserRequest, setFundraiserRequest] = useState([]);
    const [loading, setLoading] = useState(true);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getFundraiserRequest()
    },[])

    const getFundraiserRequest = useCallback((e) => {

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
            .finally(()=>{
                setLoading(!loading);
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
            <h2 className="text-center m-5">Fundraiser</h2>
            <Row className="px-5 d-flex justify-content-center">
                {loading? 
                <Spinner animation="grow" className="m-3" style={{width:"200px", height:"200px"}}/>:
                ""
                }
                {
                    fundraiserRequest.map((proposal,index) => {

                        return (
                            <AdminFundraiserCard
                                key={index}
                                id={proposal.id}
                                email={proposal.email}
                                title={proposal.first_name}
                                description={proposal.proposal_text}
                                date={proposal.date_joined}
                            />
                        )
                    })
                }
                {
                    (!loading && fundraiserRequest.length ===0 )? 

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

export default FundraiserVerifier