//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'


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
    })

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