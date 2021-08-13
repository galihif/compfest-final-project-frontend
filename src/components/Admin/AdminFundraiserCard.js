//Library
import React from "react";

//Styles
import "../Card.scss";
import { Button, Row, Col, Card } from "react-bootstrap";
import Gravatar from "react-gravatar";

const AdminFundraiserCard = (props) => {
    const normalFont = { fontSize: "12px" };
    // data
    const { email, 
            title, 
            description} = props;

    // Component
    const makeRowWithText = (title,data) =>(
            <Row>
                <Col lg={5}> 
                    <p className="text-start fw-bold" style={normalFont}>
                        {title}
                    </p>
                </Col>
                <Col lg={7}> 
                    <p className="text-start" style={normalFont}>
                        {data}
                    </p>
                </Col>
            </Row>
        )
    return (
        <Card className="campaign-card" style={{ width: "20em" }}>
            
            <Gravatar email={email} size={100} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
            
            <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>

                {makeRowWithText('Email',email)}
                {makeRowWithText('Description',description)}
                <Row>
                    <Col lg={4}>
                        <Button variant="primary" style={normalFont}>
                            Accept
                        </Button>
                    </Col>
                    <Col lg={4}>
                        <Button variant="outline-primary" style={normalFont}>
                            Details
                        </Button>
                    </Col>
                    <Col lg={4}>
                        <Button variant="danger" style={normalFont}>
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AdminFundraiserCard;
