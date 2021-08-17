//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'
import { Col, Container, Image, Row } from 'react-bootstrap'
import CardCampaign from '../components/Card/CardCampaign'
import CardCampaignRequest from '../components/Card/CardCampaignRequest'
import BoxWithdrawRequest from '../components/Box/BoxWithdrawRequest'
import emptyState from '../assets/emptyWithdrawRequest.svg'
import PaginationM from '../components/Pagination/PaginationM'


const FundraiserWithdrawRequest = () => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh
    

    const [WithdrawRequestList, setWithdrawRequestList] = useState([])

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentItems = WithdrawRequestList.slice(indexOfFirstPost, indexOfLastPost);
    const totalItems = WithdrawRequestList.length

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        getWithdrawList()
    },[])

    const getWithdrawList = useCallback((e) => {
        API.getWithdrawRequestList(headers)
            .then((res)=>{
                setWithdrawRequestList(res.data)
                console.log(res)
            })
            .catch((err)=>{
                if(err.response.status = 401){
                    refreshUserToken()
                }
            })
    }, [WithdrawRequestList])

    const refreshUserToken = () => {
        const body = {
            refresh: refreshToken
        }
        API.refresh(body)
            .then((res) => {
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
                    WithdrawRequestList.length === 0 ? (
                        <div>
                            <Col lg className="d-flex justify-content-center" >
                                <Image src={emptyState} />
                            </Col>
                            <Col lg className="d-flex justify-content-center" >
                                <p>You have no Withdraw Requested. Click Your Active Campaign to withdraw</p>
                            </Col>
                        </div>
                    ) : (
                        <Row className="d-flex justify-content-center" >
                            <Container fluid className="d-flex justify-content-center" >
                                <PaginationM
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                    paginate={paginate}
                                />
                            </Container>
                        </Row>
                    )
                }
                {
                    currentItems.map((withdraw)=>{
                        return (
                            <Col lg={3} className="d-flex justify-content-center mb-2">
                                <BoxWithdrawRequest 
                                    title={withdraw.campaign}
                                    amount={withdraw.amount}
                                    date={withdraw.request_date}
                                    status={withdraw.status}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default FundraiserWithdrawRequest