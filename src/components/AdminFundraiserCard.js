//Library
import React from "react";

//Styles
import "./CampaignCard.scss";
import { Button, Row, Col, Card } from "react-bootstrap";
import profileImage from "../assets/profileImage.svg";

const AdminFundraiserCard = () => {
    const normalFont = { fontSize: "12px" };
    return (
        <Card className="campaign-card" style={{ width: "20em" }}>
            <Card.Img
                className="m-auto mt-3 mb-1"
                variant="top"
                src={profileImage}
                style={{ height: "7em", width: "7em", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title className="text-center">Joko Widodo</Card.Title>
                <Row>
                    <Col lg={4}>
                        <p className="text-start fw-bold" style={normalFont}>
                            Email
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Description
                        </p>
                    </Col>
                    <Col lg={8}>
                        <p className="text-start" style={normalFont}>
                            lrore@gmail.com
                        </p>
                        <p className="text-start" style={normalFont}>
                            In publishing and graphic design, Lorem ipsum is a placeholder
                            text commonly used demonstrate the visual ...
                        </p>
                    </Col>
                </Row>
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
