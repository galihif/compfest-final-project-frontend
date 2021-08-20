//Library
import React, { useState, useEffect, useCallback } from 'react'

//Styles
import { 
    Row,
    Col,
    Container
 } from 'react-bootstrap';
import API from '../config/API';
import CardCampaign from '../components/Card/CardCampaign';
import PaginationM from '../components/Pagination/PaginationM';
import SkeletonCard from '../components/Skeletons/SkeletonCard';



const FeaturedCampaign = (props) => {

    const [loading, setLoading] = useState(true)
    const [skeletonItem, ] = useState([1,2,3,4])

    const [campaignList, setCampaignList] = useState([])

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentItems = campaignList.slice(indexOfFirstPost, indexOfLastPost);
    const totalItems = campaignList.length

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const headers = {
        Accept: "application/json",
    }

    //Method
    useEffect(() => {
        getCampaignList()
    },[])

    const getCampaignList = useCallback((e) => {
        setLoading(true)
        API.getAllCampaign(headers)
            .then((res) => {
                const snapshot = res.data
                const items = []
                snapshot.forEach((campaign)=>{
                    items.push(campaign)
                })
                setCampaignList(items)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [campaignList])

    return (
        <Container className="m-0" fluid>
            <h4 className="text-center my-5">Featured Campaign</h4>
            <Row className="px-5 d-flex justify-content-center">
                <Container fluid className="d-flex justify-content-center" >
                    <PaginationM
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                    />
                </Container>
                {
                    currentItems.map((campaign)=>{
                        return(
                            <Col lg={3} className="d-flex justify-content-center mb-3">
                                <CardCampaign
                                    id={campaign.id}
                                    imageURL={campaign.image_url}
                                    title={campaign.title}
                                    amount={campaign.amount}
                                    targetAmount={campaign.target_amount}
                                />
                            </Col>
                        )
                    })
                }
                {
                    loading && skeletonItem.map((skel)=>{
                        return(
                            <Col lg={3} className="d-flex justify-content-center mb-3">
                                <SkeletonCard />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default FeaturedCampaign