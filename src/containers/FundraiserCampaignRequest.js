//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'
import { Col, Row } from 'react-bootstrap'
import CardCampaign from '../components/Card/CardCampaign'
import CardCampaignRequest from '../components/Card/CardCampaignRequest'


const FundraiserCampaignRequest = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [requestedCampaignList, setRequestedCampaignList] = useState([])

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        getCampaignList()
    })

    const getCampaignList = useCallback((e) => {
        API.getUserCampaignList(headers)
            .then((res) => {
                const snapshot = res.data
                const requestedCampaign = []
                snapshot.forEach((campaign) => {
                    if (campaign.status !== "VERIFIED") {
                        requestedCampaign.push(campaign)
                    }
                })
                setRequestedCampaignList(requestedCampaign)
            })
            .catch((err) => {
                console.log(err)
                refreshUserToken()
            })
    }, [requestedCampaignList])

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
                    requestedCampaignList.map((campaign) => {
                        return (
                            <Col lg={4} className="d-flex justify-content-center mb-4">
                                <CardCampaignRequest
                                    id={campaign.id}
                                    title={campaign.title}
                                    imageURL={campaign.image_url}
                                    targetAmount={campaign.target_amount}
                                    status={campaign.status}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default FundraiserCampaignRequest