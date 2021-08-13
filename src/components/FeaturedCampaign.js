//Library
import React, { useState, useEffect, useCallback } from 'react'

//Styles
import { 
    Row,
    Col,
    Container
 } from 'react-bootstrap';
import API from '../config/API';
import CampaignCard from './CampaignCard';



const FeaturedCampaign = (props) => {

    const [campaignList, setCampaignList] = useState([])

    const headers = {
        Accept: "application/json",
    }

    //Method
    useEffect(() => {
        getCampaignList()
    }, [])

    const getCampaignList = useCallback((e) => {
        API.getAllCampaign(headers)
            .then((res) => {
                const snapshot = res.data
                const items = []
                snapshot.forEach((campaign)=>{
                    items.push(campaign)
                })
                setCampaignList(items)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [campaignList])

    return (
        <Container className="m-0" fluid>
            <h4 className="text-center my-5">Featured Campaign</h4>
            <Row className="px-5 d-flex justify-content-center">
                {
                    campaignList.map((campaign)=>{
                        return(
                            <Col lg={3} className="d-flex justify-content-center mb-3">
                                <CampaignCard
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
            </Row>
        </Container>
    )
}

export default FeaturedCampaign