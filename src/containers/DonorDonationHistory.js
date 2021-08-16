//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'
import emptyState from '../assets/emptyDonationHistory.svg'
import { Image, Row, Col } from 'react-bootstrap'
import { Button } from 'bootstrap'

const DonorDonationHistory = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [donationHistoryList, setDonationHistoryList] = useState([])

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(()=>{
        getDonationHistory()
    },[])

    const getDonationHistory = useCallback((e) => {
        API.getDonateHistoryDonor(headers)
            .then((res) => {
                setDonationHistoryList(res.data)
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })
    }, [donationHistoryList])

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
            {
                donationHistoryList.length === 0 ? (
                    <div>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Image src={emptyState} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center ">
                                <p>You Have No Donation History</p>
                            </Col>
                        </Row>
                    </div>
                ):null
            }
            {
                donationHistoryList.map((donation) => {
                    return (
                        <DonationHistoryBox
                            campaign={donation.campaign}
                            amount={donation.amount}
                            date={donation.date}
                        />
                    )
                })
            }
        </div>
    )
}

export default DonorDonationHistory