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
import NumberFormat from '../../config/Function/NumberFormat';

const CampaignCard = (props) => {
    const history = useHistory()
    const percentage = (props.amount / props.targetAmount) * 100

    const handleCardClicked = () => {
        if(!props.isLogged){
            alert("You have to login as donor to see this campaign details")
            history.push(`/login`)
        } else if (props.userData.role === "FUNDRAISER"){
            alert("You can see campaign details in dashboard")
            history.push(`/dashboardfundraiser`)
        } else if(props.userData.is_staff){
            alert("Admin Cannot see campaign detail")
        }
        else {
            history.push(`/campaign/${props.id}`)
        }
    }

    return(
        <Card className="card-campaign" style={{ width: "20em" }} onClick={handleCardClicked} >
            <Card.Img variant="top" src={props.imageURL} style={{ height: "10em", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <ProgressBar now={percentage} style={{ height: "0.8em" }} />
                <Row>
                    <Col lg={6}>
                        <p className="text-start m-0" style={{ fontSize: "12px" }}>Rp {NumberFormat(props.amount)}</p>
                        <p className="text-start fw-bold" style={{ fontSize: "12px" }}>Raised</p>
                    </Col>
                    <Col lg={6}>
                        <p className="text-end m-0" style={{ fontSize: "12px" }}>Rp {NumberFormat(props.targetAmount)}</p>
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