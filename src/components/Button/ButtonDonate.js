//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Button, Modal, Form, Row } from 'react-bootstrap'
import API from '../../config/API'

const ButtonDonate = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const userToken = props.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [loading, setLoading] = useState(false)    
    
    const [showDonate, setShowDonate] = useState(false)    
    const [userRole, setUserRole] = useState(props.userData.role)
    const [walletAmount, setWalletAmount] = useState(props.userData.wallet_amount)
    const [donateAmount, setDonateAmount] = useState(0)
    const [password, setPassword] = useState("")
    const [toWithdrawAmount, setToWithdrawAmount] = useState(0)


    const toggleDialog = () => setShowDonate(!showDonate)

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "donateAmount":
                setDonateAmount(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                break
        }
    }
    
    const handleClickPay = () => {
        setLoading(true)
        const body = {
            amount: parseInt(donateAmount),
            password: password
        }
        if (donateAmount <= walletAmount && donateAmount >= 5000) {
            API.donateCampaignById(props.id, body, headers)
                .then((res) => {
                    toggleDialog()
                    alert(res.data.status)
                    setLoading(false)
                    history.push('/dashboarddonor')
                })
                .catch((err) => {
                    if(err.response.status===401){
                        refreshUserToken()
                    } else {
                        const message = err.response.data[Object.keys(err.response.data)[0]]
                        alert(message)
                        setLoading(false)
                    }
                })
        } else if (walletAmount <= donateAmount) {
            alert("Your E-wallet balance is not enough")
                setLoading(false)
        } else if (parseInt(donateAmount) < 5000) {
            alert("Minimum amount is Rp 5000")
                setLoading(false)
        }
    }

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
                handleClickPay()
            })
            .catch((err) => {
                console.log(err, "ref")
                setLoading(false)
            })
    }

    return (
        <Row className="d-grid my-2">
            <Button variant="primary" type="submit" onClick={() => toggleDialog()}>
                DONATE
            </Button>
            <Modal show={showDonate}>
                <Modal.Header >
                    <Modal.Title>Donate To This Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="donateAmount" onChange={handleChange}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter Amount (Minimum Rp 5000)" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClickPay} disabled={loading} >
                        {
                            loading ? <div>Loading...</div> : <div>Pay with E-Wallet</div>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    )

}

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData,
        userToken: state.userToken
    };
}
export default connect(mapStateToProps)(ButtonDonate)