//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'
import { Col, Image, Row } from 'react-bootstrap'
import CardCampaign from '../components/Card/CardCampaign'
import emptyState from '../assets/emptyCampaignActive.svg'


const FundraiserFinishedCampaign = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [finishedCampaignList, setFinishedCampaignList] = useState([])

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        getCampaignList()
    },[])

    const getCampaignList = useCallback((e) => {
        API.getUserCampaignList(headers)
            .then((res) => {
                const snapshot = res.data
                const finishedCampaign = []
                snapshot.forEach((campaign) => {
                    if (campaign.status === "STOPPED") {
                        finishedCampaign.push(campaign)
                    }
                })
                setFinishedCampaignList(finishedCampaign)
            })
            .catch((err) => {
                console.log(err)
                refreshUserToken()
            })
    }, [finishedCampaignList])

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
        <div>
            <Row className="d-flex justify-content-start px-2">
                {
                    finishedCampaignList.length === 0 ? (
                        <div>
                            <Col lg className="d-flex justify-content-center" >
                                <Image src={emptyState} />
                            </Col>
                            <Col lg className="d-flex justify-content-center" >
                                <p>You have no Finished Campaign</p>
                            </Col>
                        </div>
                    ) : null
                }
                {
                    finishedCampaignList.map((campaign) => {
                        return (
                            <Col lg={4} className="d-flex justify-content-center mb-2">
                                <CardCampaign
                                    id={campaign.id}
                                    title={campaign.title}
                                    imageURL={campaign.image_url}
                                    amount={campaign.amount}
                                    targetAmount={campaign.target_amount}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default FundraiserFinishedCampaign