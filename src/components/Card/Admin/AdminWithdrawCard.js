
//Library
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Styles
import "./Card.scss";
import { Button, Row, Col, Card } from "react-bootstrap";
import Gravatar from 'react-gravatar';

import API from "../../../config/API";

const AdminWithdrawCard = (props) => {
    const normalFont = { fontSize: "12px" };
    const { id,
            change,
            setChange,
            name, 
            amount,
            email,
            date } = props;
    const dateObject = new Date(date);
    const dateFormat = `${dateObject.getDay()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`;

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const userToken = state.userToken;
    const accessToken = userToken.access;
    const refreshToken = userToken.refresh;

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    const acceptHandler = () => {
        const body = {
            id:id,
            status: "VERIFIED"
        }
        sendApiRequest(body)
    }

    const rejectHandler = () => {
        const body = {
            id:id,
            status: "REJECTED"
        }
        sendApiRequest(body)
    }

    const sendApiRequest = (body) =>{
        API.putAcceptWithdraw(body,headers)
            .then((res) => {
                if(res.status === 204){
                    alert('withdraw successfully ' + body.status)
                }
                else
                    alert('something went wrong')
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken();
                }
                else
                    alert('something went wrong')
            })
            .finally(() => {
                setChange(!change);
                console.log(change);
            })
    }

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
        <Card className="campaign-card m-2" style={{ width: "20em" }}>
            <Gravatar email={email} size={100} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Row>
                    <Col lg={5}>
                        <p className="text-start fw-bold" style={normalFont}>
                            Amount
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Email
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Date
                        </p>
                    </Col>
                    <Col lg={7}>
                        <p className="text-start" style={normalFont}>
                            Rp.{amount}
                        </p>
                        <p className="text-start" style={normalFont}>
                            {email}
                        </p>
                        <p className="text-start" style={normalFont}>
                            {dateFormat}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Button variant="primary" style={normalFont} onClick={()=>acceptHandler()}>
                            Accept
                        </Button>
                    </Col>
                    <Col lg={4}/>
                    <Col lg={4}>
                        <Button variant="danger" style={normalFont} onClick={()=>rejectHandler()}>
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AdminWithdrawCard;