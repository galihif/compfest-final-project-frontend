//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import TopUpHistoryBox from '../components/Box/TopUpHistoryBox'

import emptyState from '../assets/emptyTopupHistory.svg'
import { Image, Row, Col } from 'react-bootstrap'
import PaginationM from '../components/Pagination/PaginationM'


const DonorTopupHistory = (props) => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [topUpHistoryList, setTopUpHistoryList] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentItems = topUpHistoryList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        getTopUpHistory()
    },[props.render])

    const getTopUpHistory = () => {
        API.getUserTopUpList(headers)
            .then((res) => {
                setTopUpHistoryList(res.data)
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status = 401){
                    refreshUserToken()
                }
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
                console.log(err, "ref")
            })
    }

    return(
        <div>
            <PaginationM 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={topUpHistoryList.length}
                paginate={paginate}
            />
            {
                topUpHistoryList.length === 0 ? (
                    <div>
                        <Row>
                            <Col className="d-flex justify-content-center px-5 my-5">
                                <Image src={emptyState} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center px-5 ">
                                <p>You Have No Top Up Transaction</p>
                            </Col>
                        </Row>
                    </div>
                ) :null
            }
            {
                currentItems.map((topup) => {
                    return (
                        <TopUpHistoryBox
                            amount={topup.amount}
                            date={topup.date}
                            status={topup.status} />
                    )
                })
            }
        </div>
    )
}

export default DonorTopupHistory