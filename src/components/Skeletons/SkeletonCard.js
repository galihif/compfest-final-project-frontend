//Library
import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

//Styles
import '../Card/Card.scss'
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';

const SkeletonCard = ({ theme }) => {
    
    const themeClass = theme || 'light'

    return(
        <Card className="card-campaign p-2" style={{ width: "20em" }} >
            <div className={`skeleton-wrapper-card ${themeClass}`}>
                <div className="skeleton-card">
                    <SkeletonElement type="card-image" />
                    <SkeletonElement type="title" />
                    <br/>
                    <SkeletonElement type="text" />
                    <Row className="d-flex justify-content-between">
                        <Col lg={3}>
                            <SkeletonElement type="text m-0" />
                        </Col>
                        <Col lg={3} >
                            <SkeletonElement type="text m-0" />
                        </Col>
                    </Row>
                </div>
                <Shimmer />
            </div>
        </Card>
    )
}


export default (SkeletonCard)