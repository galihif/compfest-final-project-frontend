//Library
import React from 'react'

//Styles
import { 
    Row,
    Col,
    Container
 } from 'react-bootstrap';
import CampaignCard from './CampaignCard';



const FeaturedCampaign = (props) => {
    return (
        <Container className="m-0" fluid>
            <h4 className="text-center my-5">Featured Campaign</h4>
            <Row className="px-5 d-flex justify-content-center">
                <Col lg={3} className="d-flex justify-content-center mb-3">
                    <CampaignCard
                        id="1"
                        title="Bantu ibu ini menyewa baliho"
                        amount="2323"
                        targetAmount="10000"
                        />
                </Col>
            </Row>
        </Container>
    )
}

export default FeaturedCampaign