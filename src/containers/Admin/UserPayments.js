//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container, Spinner, Col, Image } from 'react-bootstrap'
import API from '../../config/API'
import AdminCampaignProposalCard from '../../components/Card/Admin/AdminCampaignProposalCard';
import AdminUserPaymentCard from '../../components/Card/Admin/AdminUserPaymentCard';
import empty from '../../assets/adminEmptyArray.svg'

const UserPayments = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;

    const [loading, setLoading] = useState(true);
    const [userRequest, setUserRequest] = useState([]);
    const [change, setChange] = useState(true);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getUserPayments();
        console.log('print');
    },[change])

    const getUserPayments = useCallback((e) => {
        API.getUserPayments(headers)
            .then((res) => {
                setUserRequest(res.data);
                console.log(res.data);
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
    }, [userRequest])

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
            <h2 className="text-center m-5">User Payment</h2>
            <Row className="px-5 d-flex justify-content-center">
                {loading? 
                <Spinner animation="grow" className="m-3" style={{width:"200px", height:"200px"}}/>:
                ""
                }
                {
                    userRequest.map((payment,index) => {
                        console.log(payment);
                        return (
                            <AdminUserPaymentCard 
                                change={change}
                                setChange={setChange}
                                key={index}
                                id={payment.id}
                                email={payment.email}
                                name={payment.user}
                                amount={payment.amount}
                                bankName={payment.bank_name}
                                accountNumber={payment.bank_account_number}
                                accountName={payment.bank_account}
                            />
                        )
                    })
                }
                {
                    (!loading && userRequest.length ===0 )? 

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

export default UserPayments;