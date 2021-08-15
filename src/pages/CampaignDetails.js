//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    ProgressBar,
    Form,
    Image,
    Breadcrumb,
    Modal
} from 'react-bootstrap';
import API from '../config/API';
import axios from 'axios';


//Assets

const CampaignDetails = (props) => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const {id} = useParams()

    const [show, setShow] = useState(false)
    const [isLogged, setLogged] = useState(props.isLogged)

    const [userRole, setUserRole] = useState(props.userData.role)
    const [walletAmount, setWalletAmount] = useState(props.userData.wallet_amount)
    const [donateAmount, setDonateAmount] = useState(0)
    const [password, setPassword] = useState("")
    const [toWithdrawAmount, setToWithdrawAmount] = useState(0)

    const [title, setTitle] = useState("Loading")
    const [description, setDescription] = useState("")
    const [imageURL, setImage] = useState("")
    const [amount, setAmount] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [withdrawAmount, setWithdrawAmount] = useState("")
    const [fundraiserName, setFundraiserName] = useState("")
    const [fundraiserEmail, setFundraiserEmail] = useState("")

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    //Method
    useEffect(() => {
        getCampaignData()
    }, [show]);

    const getCampaignData = useCallback((e) => {
        if (userRole === "FUNDRAISER") {
            API.getCampaignByIdFundraiser(id, headers)
                .then((res) => {
                    const campaign = res.data
                    setTitle(campaign.title)
                    setDescription(campaign.description)
                    setImage(campaign.image_url)
                    setAmount(campaign.amount)
                    setTargetAmount(campaign.target_amount)
                    setWithdrawAmount(campaign.withdraw_amount)
                    setFundraiserName(campaign.fundraiser.full_name)
                    setFundraiserEmail(campaign.fundraiser.email)
                    console.log(campaign)
                })
                .catch((err) => {
                    console.log(err)
                    refreshUserToken()
                })
        } else {
            API.getCampaignByIdDonor(id, headers)
                .then((res) => {
                    const campaign = res.data
                    setTitle(campaign.title)
                    setDescription(campaign.description)
                    setImage(campaign.image_url)
                    setAmount(campaign.amount)
                    setTargetAmount(campaign.target_amount)
                    setFundraiserName(campaign.fundraiser.full_name)
                    setFundraiserEmail(campaign.fundraiser.email)
                })
                .catch((err) => {
                    console.log(err)
                    refreshUserToken()
                })
        }
    },[title,description,imageURL,amount,targetAmount,fundraiserName,fundraiserEmail])

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

    const toggleDialog = () => setShow(!show)

    const handleChange = (e) => {
        switch(e.target.id){
            case "donateAmount":
                setDonateAmount(e.target.value)
                break
            case "toWithdrawAmount":
                setToWithdrawAmount(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    const handleClickPay = () => {
        const body = {
            amount: parseInt(donateAmount),
            password: password
        }
        if (donateAmount <= walletAmount && donateAmount>=5000){
            API.donateCampaignById(id,body,headers)
                .then((res) => {
                    console.log(res)
                    toggleDialog()
                    alert(res.data.status)
                })
                .catch((err)=>{
                    console.log(err.response)
                    alert(err.response.data)
                })
        } else if (walletAmount <= donateAmount){
            alert("Your E-wallet balance is not enough")
        } else if (parseInt(donateAmount) < 5000){
            alert("Minimum amount is Rp 5000")
        }
    }

    const handleClickWithdraw = () => {
        const body = {
            amount: parseInt(toWithdrawAmount)
        }
        if (toWithdrawAmount <= withdrawAmount && toWithdrawAmount !== 0) {
        //    API.withdrawCampaignById(id,body,headers)
        //     .then((res)=> {
        //         console.log(res.data)
        //     })
        } else if (toWithdrawAmount > withdrawAmount){
            alert("amount is too high")
        } else if (toWithdrawAmount === "undefined") {
            alert("Fill the amount")
        }
    }

    //Component

    const dialogNotLogged = 
        <Modal show={show}>
            <Modal.Header >
                <Modal.Title>Donate To This Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You have to login if you want to donate</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleDialog}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={()=> history.push('/login')}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>

    const dialogDonor =
        <Modal show={show}>
            <Modal.Header >
                <Modal.Title>Donate To This Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="donateAmount" onChange={handleChange}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Amount (Rp)" />
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
                <Button variant="primary" onClick={handleClickPay}>
                    Pay with E-Wallet
                </Button>
            </Modal.Footer>
        </Modal>

    const dialogFundraiser =
        <Modal show={show}>
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
                <Button variant="secondary" onClick={toggleDialog}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClickWithdraw}>
                    Make Request
                </Button>
            </Modal.Footer>
        </Modal>


    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Campaign</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="login-container  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Image src={imageURL} rounded style={{ width: "100%" }} />
                    <Container>
                        <h4 className="my-3">{title}</h4>
                        <ProgressBar now={(amount/targetAmount)*100} />
                        <Row className="my-3">
                            <Col lg={6}>
                                <p className="text-start m-0" style={{ fontSize: "16px" }}>Rp.{amount}</p>
                                <p className="text-start m-0" style={{ fontSize: "16px" }}>Rp.{withdrawAmount}</p>
                                <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                            </Col>
                            <Col lg={6}>
                                <p className="text-end m-0" style={{ fontSize: "16px" }}>Rp. {targetAmount}</p>
                                <p className="text-end fw-bold" style={{ fontSize: "12px" }}>Target</p>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <p>Fundraiser</p>
                            <Col lg={1}>
                                <Gravatar email={fundraiserEmail} size={30} style={{ borderRadius: "20em" }} />
                            </Col>
                            <Col className="d-flex align-items-center">
                                <p className="my-0 me-2">{fundraiserName}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0673A1" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </Col>
                        </Row>
                        <p>
                            {description}
                        </p>
                        <Row className="d-grid my-2">
                            {
                                props.userData.role === "DONATUR" ? (
                                    <Button variant="primary" type="submit" onClick={() => toggleDialog()}>
                                        DONATE
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit" onClick={() => toggleDialog()}>
                                        WITHDRAW
                                    </Button>
                                )
                            }
                        </Row>
                    </Container>
                </Container>
                {
                    props.userData.role === "DONATUR" ? (
                        dialogDonor
                    ) : (dialogFundraiser)
                }
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData
    };
}


export default connect(mapStateToProps)(CampaignDetails)