//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container, Col, Image, Spinner } from 'react-bootstrap'
import API from '../../config/API'
import AdminWithdrawCard from '../../components/Card/Admin/AdminWithdrawCard';
import empty from '../../assets/adminEmptyArray.svg'

const TopupUser = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;

    const [loading, setLoading] = useState(true);
    const [withdrawRequest, setUserRequest] = useState([]);
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
        API.getListWithdrawsAdmin(headers)
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
    }, [withdrawRequest])

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
            <h2 className="text-center m-5">Fundraiser Withdraws</h2>
            <Row className="px-5 d-flex justify-content-center">
                {loading? 
                <Spinner animation="grow" className="m-3" style={{width:"200px", height:"200px"}}/>:
                ""
                }
                {
                    withdrawRequest.map((withdraw,index) => {
                        console.log(withdraw);
                        return (
                            <AdminWithdrawCard
                                change={change}
                                setChange={setChange}
                                key={index}
                                id={withdraw.id}
                                email={withdraw.user_email}
                                name={withdraw.user}
                                amount={withdraw.amount}
                            />
                        )
                    })
                }
                {
                    (!loading && withdrawRequest.length ===0 )? 

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

export default TopupUser