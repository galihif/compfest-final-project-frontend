//Library
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'

//Styles
import './Card.scss'
import {
    ProgressBar,
    Row,
    Col,
    Card
} from 'react-bootstrap';

const CampaignCard = (props) => {
    const history = useHistory()
    const percentage = (props.amount / props.targetAmount) * 100

    const handleCardClicked = () => {
        history.push(`/campaign/${props.id}`)
    }
    return(
        <Card className="card-campaign" style={{ width: "20em" }} onClick={handleCardClicked} >
            <Card.Img variant="top" src={props.imageURL} style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <ProgressBar now={percentage} style={{ height: "0.8em" }} />
                <Row>
                    <Col lg={6}>
                        <p className="text-start m-0" style={{ fontSize: "12px" }}>Rp. {props.amount}</p>
                        <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-end m-0" style={{ fontSize: "12px" }}>Rp.{ props.targetAmount}</p>
                        <p className="text-end fw-bold" style={{fontSize:"12px"}}>Target</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.isLogged,
        userData: state.userData
    };
}

export default connect(mapStateToProps)(CampaignCard)