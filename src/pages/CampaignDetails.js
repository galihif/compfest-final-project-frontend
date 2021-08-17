//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Container,
    Row,
    Col,
    ProgressBar,
    Image,
    Breadcrumb,
} from 'react-bootstrap';
import API from '../config/API';
import SkeletonCampaignDetails from '../components/Skeletons/SkeletonCampaignDetails';
import ButtonDonate from '../components/Button/ButtonDonate';
import ButtonWithdrawStop from '../components/Button/ButtonWithdrawStop';


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
    const [loading, setLoading] = useState(true)

    const [userRole, setUserRole] = useState(props.userData.role)


    const [campaign, setCampaign] = useState({})


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
                    setCampaign(campaign)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    refreshUserToken()
                })
        } else {
            API.getCampaignByIdDonor(id, headers)
                .then((res) => {
                    const campaign = res.data
                    setCampaign(campaign)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    refreshUserToken()
                })
        }
    },[campaign])

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
                console.log(res.data)
                dispatch({ type: 'REFRESH', userToken: res.data })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err, "ref")
            })
    }


    //Component

    // const dialogNotLogged = 
    //     <Modal show={show}>
    //         <Modal.Header >
    //             <Modal.Title>Donate To This Campaign</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //             <p>You have to login if you want to donate</p>
    //         </Modal.Body>
    //         <Modal.Footer>
    //             <Button variant="secondary" onClick={toggleDialog}>
    //                 Cancel
    //             </Button>
    //             <Button variant="primary" onClick={()=> history.push('/login')}>
    //                 Login
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Campaign</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    {
                        loading ? (
                            <Row>
                                <SkeletonCampaignDetails />
                            </Row>
                            
                        ) : (
                            <div>
                                <Image src={campaign.image_url} rounded style={{ width: "100%" }} />
                                <Container>
                                    <h4 className="my-3">{campaign.title}</h4>
                                    <ProgressBar now={(campaign.amount / campaign.target_amount) * 100} />
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <p className="text-start m-0" style={{ fontSize: "16px" }}>Rp.{campaign.amount}</p>
                                            {
                                                props.userData.role === "FUNDRAISER" ? (
                                                    <p className="text-start m-0" style={{ fontSize: "16px" }}>Rp.{campaign.withdraw_amount} Withdrawn </p>
                                                ) : null
                                            }
                                            <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p className="text-end m-0" style={{ fontSize: "16px" }}>Rp. {campaign.target_amount}</p>
                                            <p className="text-end fw-bold" style={{ fontSize: "12px" }}>Target</p>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <p>Fundraiser</p>
                                        <Col lg={1}>
                                            <Gravatar email={campaign.fundraiser.email} size={30} style={{ borderRadius: "20em" }} />
                                        </Col>
                                        <Col className="d-flex align-items-center">
                                            <p className="my-0 me-2">{campaign.fundraiser.full_name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0673A1" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                            </svg>
                                        </Col>
                                    </Row>
                                    <p>
                                        {campaign.description}
                                    </p>
                                    {
                                        props.userData.role === "DONATUR" ? (
                                            <ButtonDonate id={id}/>
                                        ) : (
                                            <ButtonWithdrawStop campaign={campaign} />
                                        )
                                    }
                                </Container>
                            </div>
                        )
                    }
                </Container>
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