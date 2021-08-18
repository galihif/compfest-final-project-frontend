//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Button, Modal, Form, Row } from 'react-bootstrap'
import API from '../../config/API'
import axios from 'axios'

const ButtonWithdrawStop = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const userToken = props.userToken

    const [accessToken, setAccessToken] = useState(userToken.access)
    const [refreshToken, setRefreshToken] = useState(userToken.refresh)
    
    const [showWithdraw, setShowWithdraw] = useState(false)
    const [showStop, setShowStop] = useState(false)

    const [campaign, setCampaign] = useState(props.campaign)
    
    const [loading, setLoading] = useState(false)
    const [toWithdrawAmount, setToWithdrawAmount] = useState(0)
    const remainingAmount = campaign.amount - campaign.withdraw_amount

    const toggleDialogWithdraw = () => setShowWithdraw(!showWithdraw)
    const toggleDialogStop = () => setShowStop(!showStop)

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }
    
    useEffect(()=>{
        console.log(accessToken)
    })

    const handleChange = (e) => {
        switch (e.target.id) {
            case "toWithdrawAmount":
                setToWithdrawAmount(e.target.value)
                break
            default:
                break
        }
    }

    const handleStopCampaign = () => {
        setLoading(true)
        fetch(`https://donatur.herokuapp.com/api/fundraiser/campaigns/${campaign.id}/`,{
            method: 'PUT',
            headers: headers
        }).then((res)=>{
            console.log(res)
            setLoading(false)
            alert("Campaign Finished Successfully")
            history.push('/dashboardfundraiser')
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }
    
    const handleClickWithdraw = () => {
        setLoading(true)
        const body = {
            amount: parseInt(toWithdrawAmount)
        }
        if (toWithdrawAmount <= remainingAmount && toWithdrawAmount !== 0) {
            API.withdrawCampaignById(campaign.id, body, headers)
                .then((res) => {
                    alert("Withdraw Requested")
                    setLoading(false)
                    // history.push('/dashboardfundraiser')
                    toggleDialogWithdraw()
                })
                .catch((err) => {
                    if(err.response.status === 401){
                        refreshUserToken(true)
                    } else {
                        setLoading(false)
                    }
                })
        } else if (toWithdrawAmount > remainingAmount) {
            alert("amount is too high")
        } else if (toWithdrawAmount === "undefined") {
            alert("Fill the amount")
        }
    }

    const refreshUserToken = (isWithdraw) => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
                setAccessToken(res.data.access)
                if(isWithdraw){
                    handleClickWithdraw()
                } else {
                    handleStopCampaign()
                }
            })
            .catch((err) => {
                console.log(err, "ref")
            })
    }

    return (
        <div>
            <Row className="d-grid">
                <Button variant="primary" type="submit" onClick={toggleDialogWithdraw}>
                    WITHDRAW
                </Button>
            </Row>
            {
                !campaign.status === "STOPPED" ? (
                    <Row className="d-grid">
                        <Button variant="outline-danger my-3" type="submit" onClick={toggleDialogStop}>
                            STOP THIS CAMPAIGN
                        </Button>
                    </Row>
                ):null
            }
            <div>
                <Modal show={showWithdraw}>
                    <Modal.Header >
                        <Modal.Title>Withdraw This Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="toWithdrawAmount" onChange={handleChange}>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter Amount (Rp)" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleDialogWithdraw}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClickWithdraw} disable={loading} >
                            {
                                loading ? <div>Loading...</div> : <div>Make Request</div>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showStop}>
                    <Modal.Header >
                        <Modal.Title>Finish This Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Text>Are you sure want to stop this campaign?</Form.Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleDialogStop}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleStopCampaign} disable={loading} >
                            {
                                loading ? <div>Loading...</div> : <div>Stop</div>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )

}

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData,
        userToken: state.userToken
    };
}
export default connect(mapStateToProps)(ButtonWithdrawStop)