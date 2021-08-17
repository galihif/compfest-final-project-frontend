//Library
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import API from '../config/API'
import DonationHistoryBox from '../components/Box/DonationHistoryBox'
import { Col, Container, Image, Row } from 'react-bootstrap'
import CardCampaign from '../components/Card/CardCampaign'
import CardCampaignRequest from '../components/Card/CardCampaignRequest'

import emptyState from '../assets/emptyCampaignRequest.svg'
import PaginationM from '../components/Pagination/PaginationM'


const FundraiserCampaignRequest = (props) => {
    //State
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const userToken = state.userToken
    const accessToken = userToken.access
    const refreshToken = userToken.refresh

    const [requestedCampaignList, setRequestedCampaignList] = useState([])

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentItems = requestedCampaignList.slice(indexOfFirstPost, indexOfLastPost);
    const totalItems = requestedCampaignList.length

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        getCampaignList()
    },[props.render])

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
                    requestedCampaignList.length === 0 ? (
                        <div>
                            <Col lg className="d-flex justify-content-center" >
                                <Image src={emptyState} />
                            </Col>
                            <Col lg className="d-flex justify-content-center" >
                                <p>You have no Requested Campaign</p>
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
                    currentItems.map((campaign) => {
                        return (
                            <Col lg={4} className="d-flex justify-content-center mb-2">
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