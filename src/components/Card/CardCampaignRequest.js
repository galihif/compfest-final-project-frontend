//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Styles
import './Card.scss'
import {
    Button,
    ProgressBar,
    Row,
    Col,
    Badge,
    Card,
    Modal
} from 'react-bootstrap';
import API from '../../config/API';

const CardCampaignRequest = (props) => {
    //State
    const id = props.id
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const toggleDialog =()=> setShow(!show)

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
                handleDelete()
            })
            .catch((err) => {
                setLoading(false)
                console.log(err, "ref")
            })
    }


    const handleDelete = () => {
        setLoading(true)
        API.deleteCampaignById(id, headers)
            .then((res)=>{
                console.log(res)
                alert("Campaign Deleted Successfully")
                setLoading(false)
                toggleDialog()
                window.location.reload()
            })
            .catch((err)=>{
                if(err.response.status === 401){
                    refreshUserToken()
                } else {
                    setLoading(false)
                }
            })
    }
    return(
        <div>
            <Card className="card-campaign-request" style={{ width: "20em" }}>
                <Card.Img variant="top" src={props.imageURL} style={{ height: "10em", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Row>
                        <p><b>Target</b> : Rp {props.targetAmount}</p>
                    </Row>
                    <Row>
                        <Col lg="auto">
                            <Button variant="outline-danger" size="sm" onClick={toggleDialog} >Delete</Button>
                        </Col>
                        <Col>
                            {
                                props.status === "PENDING" ? (
                                    <Badge bg="secondary">Pending</Badge>
                                ) : props.status === "VERIFIED" ? (
                                    <Badge bg="success">Verified</Badge>
                                ) : (
                                    <Badge bg="danger">Rejected</Badge>
                                )
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Delete Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure want to delete this campaign?</p>
                    <h5>{props.title}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDialog}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disable={loading} >
                        {
                            loading ? <>Loading</> : <>Delete</>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CardCampaignRequest