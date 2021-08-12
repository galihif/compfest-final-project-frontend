//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    Tabs,
    Tab,
    Breadcrumb,
    Modal,
    Form
} from 'react-bootstrap';


//Assets
import DonationHistoryBox from '../components/DonationHistoryBox';
import TopUpHistoryBox from '../components/TopUpHistoryBox';
import API from '../config/API';

const DashboardDonor = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [show, setShow] = useState(false)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [walletAmount, setWalletAmount] = useState("")
    const [id, setId] = useState("")

    const [bankName, setBankName] = useState("")
    const [bankAccountName, setBankAccountName] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [amount, setAmount] = useState()

    const [topUpHistoryList, setTopUpHistoryList] = useState([])


    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    //Method
    useEffect(() => {
        getUserData()
        getTopUpHistory()
    }, [show]);

    const toggleDialog = () => setShow(!show)

    const handleChange = useCallback (e =>{
        switch (e.target.id) {
            case "bankName":
                setBankName(e.target.value)
                break
            case "bankAccountName":
                setBankAccountName(e.target.value)
                break
            case "bankAccountNumber":
                setBankAccountNumber(e.target.value)
                break
            case "amount":
                setAmount(e.target.value)
                break
            default:
                break
        }
    })

    const handleConfirmTopUp = () => {
        const body = {
            amount: amount,
            bank_name: bankName,
            bank_account: bankAccountName,
            bank_account_number: bankAccountNumber.toString()
        }

        if (bankName === "" || bankAccountName === "" || bankAccountNumber.toString() === "" || amount.toString() === ""){
            alert("Isi semuanya bos")
        } else if (amount < 5000) {
            alert("Minimum Top Up 5000")
        } else {
            //TODO top up
            API.topUp(body,headers)
                .then((res) => {
                    console.log(res.data)
                    toggleDialog()
                    alert("Top Up Request Success. Check Your Top Up History")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const getTopUpHistory = () => {
        API.getUserTopUpList(headers)
            .then((res) => {
                const snapshot = res.data
                const items = []
                snapshot.forEach((data) => {
                    items.push(data)
                })
                setTopUpHistoryList(items)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/login")
    }

    const getUserData = () => {
        API.getCurrentUser(headers)
            .then((res) => {
                const userData = res.data
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setWalletAmount(userData.wallet_amount)
                setId(userData.id)
            })
            .catch((err) => {
                console.log(err,"get")
                refreshUserToken()
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
                console.log(err,"ref")
            })
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="dashboard-box  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Container  >
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center">
                                <h5 className="my-0 mx-2">Donor Dashboard</h5>
                                <Button variant="danger" size="sm" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                </Button>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col className="d-flex justify-content-center">
                                <Gravatar email={email} size="120" style={{ borderRadius: "20em" }} />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col className="d-flex justify-content-center align-items-center">
                                <p className="my-0 me-1 fs-5" >{firstName} {lastName}</p>
                            </Col>
                        </Row>
                        <Row className="my-3 d-flex justify-content-center">
                            <Col lg={1} className="mx-3">
                                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.0311 0C35.9289 0 40 3.96919 40 10.7636H31.5378V10.8329C27.6104 10.8329 24.4267 13.937 24.4267 17.766C24.4267 21.595 27.6104 24.6991 31.5378 24.6991H40V25.3231C40 32.0308 35.9289 36 29.0311 36H10.9689C4.07111 36 0 32.0308 0 25.3231V10.6769C0 3.96919 4.07111 0 10.9689 0H29.0311ZM38.5067 13.7448C39.3314 13.7448 40 14.3967 40 15.2008V20.2619C39.9904 21.0621 39.3274 21.7085 38.5067 21.7179H31.6978C29.7096 21.7439 27.971 20.4167 27.52 18.5286C27.2942 17.3566 27.6112 16.1471 28.3861 15.2244C29.1611 14.3017 30.3147 13.7601 31.5378 13.7448H38.5067ZM32.4978 16.0847H31.84C31.4362 16.0801 31.0472 16.2333 30.76 16.5101C30.4727 16.7869 30.3111 17.1643 30.3111 17.558C30.3111 18.3841 30.9928 19.0565 31.84 19.066H32.4978C33.3422 19.066 34.0267 18.3986 34.0267 17.5753C34.0267 16.7521 33.3422 16.0847 32.4978 16.0847ZM20.7644 7.78238H9.47556C8.63807 7.78232 7.95641 8.43919 7.94667 9.25566C7.94667 10.0817 8.62831 10.7541 9.47556 10.7636H20.7644C21.6088 10.7636 22.2933 10.0962 22.2933 9.27299C22.2933 8.44975 21.6088 7.78238 20.7644 7.78238Z" fill="#0673A1" />
                                </svg>
                            </Col>
                            <Col lg="auto" className="d-flex align-items-center" >Rp. {walletAmount}</Col>
                            <Col lg="auto" className="d-flex align-items-center" >
                                <Button variant="outline-primary" size="sm" onClick={()=>toggleDialog()}>Top Up</Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="my-3">
                    <Tab eventKey="home" title="Donation History">
                        <DonationHistoryBox />
                        <DonationHistoryBox />
                        <DonationHistoryBox />
                    </Tab>
                    <Tab eventKey="profile" title="Top Up History">
                        {
                            topUpHistoryList.map((topup) => {
                                console.log(topup)
                                return(
                                    <TopUpHistoryBox
                                        amount={topup.amount}
                                        date={topup.date}
                                        status={topup.status} />
                                )
                            })
                        }
                    </Tab>
                </Tabs>
            </div>
            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>Top Up E-Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="bankName" onChange={handleChange}>
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Bank Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bankAccountName" onChange={handleChange}>
                        <Form.Label>Bank Account Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Bank Account Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bankAccountNumber" onChange={handleChange}>
                        <Form.Label>Bank Account Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Bank Account Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount" onChange={handleChange}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter Amount (Minimum Rp 5000)" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmTopUp}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DashboardDonor