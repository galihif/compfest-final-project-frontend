//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container, Button} from 'react-bootstrap'
import API from '../../config/API'
import AdminWithdrawCard from '../../components/Card/Admin/AdminWithdrawCard';

const TopupUser = () => {
    //State
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;

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
            <Row className="px-5 d-flex justify-content-center">
                {
                    userRequest.map((withdraw,index) => {
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
            </Row>
        </Container>
    )
}

export default TopupUser