//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Config
import API from '../config/API';

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    Tabs,
    Tab,
    Breadcrumb,
    Tooltip,
    OverlayTrigger,
    Modal,
    Form,
    Spinner
} from 'react-bootstrap';


//Assets
import FundraiserActiveCampaign from '../containers/FundraiserActiveCampaign';
import FundraiserCampaignRequest from '../containers/FundraiserCampaignRequest';
import FundraiserWithdrawRequest from '../containers/FundraiserWithdrawRequest';
import ButtonLogout from '../components/Button/ButtonLogout';
import FundraiserFinishedCampaign from '../containers/FundraiserFinishedCampaign';
import NotFound from './NotFound';

const DashboardFundraiser = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const userToken = state.userToken
    const [accessToken, setAccessToken] = useState(userToken.access)
    const [refreshToken, setRefreshToken] = useState(userToken.refresh)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [show, setShow] = useState(false)
    const [render, setRender] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [loadingMakeCam, setLoadingMakeCam] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [walletAmount, setWalletAmount] = useState("")
    const [verified, setVerified] = useState(false)
    const [id, setId] = useState("")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [imageURL, setImageURL] = useState("")

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    //Method
    useEffect(() => {
        getUserData()
    },[])

    const toggleDialog = () => setShow(!show)

    const handleChange = useCallback(e => {
        switch (e.target.id) {
            case "title":
                setTitle(e.target.value)
                break
            case "description":
                setDescription(e.target.value)
                break
            case "targetAmount":
                setTargetAmount(e.target.value)
                break
            case "imageURL":
                setImageURL(e.target.value)
                break
            default:
                break
        }
    },[title,description,targetAmount,imageURL])

    const handleCreateCampaign = () => {
        setLoadingMakeCam(true)
        const body = {
            title: title,
            description: description,
            target_amount: targetAmount,
            image_url: imageURL
        }
        if (title==="" || description==="" || targetAmount.toString()==="" || imageURL===""){
            alert("Please fill all the form")
            setLoadingMakeCam(false)
        } else {
            API.createCampaign(body,headers)
                .then((res) => {
                    console.log(res) 
                    toggleDialog()
                    setLoadingMakeCam(false)
                    setRender(!render)
                    alert("Campaign Proposal Requested. Check Your Campaign Request Tab")
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        refreshUserToken()
                    } else if (err.response.status === 400) {
                        setLoadingMakeCam(false)
                        alert(err.response.data.target_amount)
                    }
                })
        }
    }

    const getUserData = useCallback((e) => {
        API.getCurrentUser(headers)
            .then((res) => {
                const userData = res.data
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setWalletAmount(userData.wallet_amount)
                setVerified(userData.verified)
                setId(userData.id)
                setLoadingProfile(false)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    refreshUserToken()
                }
                console.log(err)
            })
    },[firstName,lastName,email,walletAmount,verified,id])

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                dispatch({ type: 'REFRESH', userToken: res.data })
                window.location.reload()
                
            })
            .catch((err) => {
                console.log(err,"ref")
            })
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {
                verified ? 
                    <div>Your account is Verified</div>
                    : <div>Your account is not Verified yet</div>
            }
        </Tooltip>
    );

    if (!state.isLogged) {
        return <NotFound />
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="dashboard-box  p-3" style={{ width: "64em" }}>
                    <Container  >
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center">
                                <h5 className="my-0 mx-2">Fundraiser Dashboard</h5>
                                <ButtonLogout/>
                            </Col>
                        </Row>
                        {
                            loadingProfile ? (
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-center px-5" style={{ height: "16em" }}>
                                        <Spinner animation="grow" variant="primary" />
                                    </Col>
                                </Row>
                            ) : (
                                    <div>
                                        <Row className="my-3">
                                            <Col className="d-flex justify-content-center">
                                                <Gravatar email={email} size="120" style={{ borderRadius: "20em" }} />
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <p className="my-0 me-1 fs-5" >{firstName} {lastName}</p>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={verified ? "#0673A1" : "#787878"} class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                    </svg>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                        <Row className="my-3 d-flex justify-content-center">
                                            <Col lg={1} className="mx-3">
                                                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M29.0311 0C35.9289 0 40 3.96919 40 10.7636H31.5378V10.8329C27.6104 10.8329 24.4267 13.937 24.4267 17.766C24.4267 21.595 27.6104 24.6991 31.5378 24.6991H40V25.3231C40 32.0308 35.9289 36 29.0311 36H10.9689C4.07111 36 0 32.0308 0 25.3231V10.6769C0 3.96919 4.07111 0 10.9689 0H29.0311ZM38.5067 13.7448C39.3314 13.7448 40 14.3967 40 15.2008V20.2619C39.9904 21.0621 39.3274 21.7085 38.5067 21.7179H31.6978C29.7096 21.7439 27.971 20.4167 27.52 18.5286C27.2942 17.3566 27.6112 16.1471 28.3861 15.2244C29.1611 14.3017 30.3147 13.7601 31.5378 13.7448H38.5067ZM32.4978 16.0847H31.84C31.4362 16.0801 31.0472 16.2333 30.76 16.5101C30.4727 16.7869 30.3111 17.1643 30.3111 17.558C30.3111 18.3841 30.9928 19.0565 31.84 19.066H32.4978C33.3422 19.066 34.0267 18.3986 34.0267 17.5753C34.0267 16.7521 33.3422 16.0847 32.4978 16.0847ZM20.7644 7.78238H9.47556C8.63807 7.78232 7.95641 8.43919 7.94667 9.25566C7.94667 10.0817 8.62831 10.7541 9.47556 10.7636H20.7644C21.6088 10.7636 22.2933 10.0962 22.2933 9.27299C22.2933 8.44975 21.6088 7.78238 20.7644 7.78238Z" fill="#0673A1" />
                                                </svg>
                                            </Col>
                                            <Col lg="auto" className="d-flex align-items-center" >Rp. {walletAmount} </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col className="d-flex justify-content-center">
                                                <Button variant="primary" size="sm" onClick={() => verified ? toggleDialog() : alert("You can't make a campaign if not verified")} >Make a Campaign</Button>
                                            </Col>
                                        </Row>
                                </div>
                            )
                        }
                    </Container>
                </Container>
                <Tabs defaultActiveKey="campaignActive" id="uncontrolled-tab-example" className="my-3">
                    <Tab eventKey="campaignActive" title="Active Campaign">
                        <FundraiserActiveCampaign/>
                    </Tab>
                    <Tab eventKey="campaignFinished" title="Finished Campaign">
                        <FundraiserFinishedCampaign render={render}/>
                    </Tab>
                    <Tab eventKey="campaignRequest" title="Campaign Request">
                        <FundraiserCampaignRequest render={render}/>
                    </Tab>
                    <Tab eventKey="withdrawRequest" title="Withdrawal Request">
                        <FundraiserWithdrawRequest />
                    </Tab>
                </Tabs>
            </div>
            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>Make a Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title" onChange={handleChange}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Add Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description" onChange={handleChange}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Add Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="targetAmount" onChange={handleChange}>
                        <Form.Label>Target</Form.Label>
                        <Form.Control type="number" placeholder="Add Target (Rp)" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageURL" onChange={handleChange}>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Add Image URL" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateCampaign} disabled={loadingMakeCam} >
                        {
                            loadingMakeCam ? <div>Loading...</div> : <div>Create Campaign</div>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DashboardFundraiser