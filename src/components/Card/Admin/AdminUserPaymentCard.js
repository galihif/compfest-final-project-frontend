
//Library
import React from "react";

//Styles
import "../Card.scss";
import { Button, Row, Col, Card } from "react-bootstrap";
import profileImage from "../assets/profileImage.svg";

const AdminUserCard = () => {
    const normalFont = { fontSize: "12px" };
    return (
        <Card className="card-campaign" style={{ width: "20em" }}>
            <Card.Img
                className="m-auto mt-3 mb-1"
                variant="top"
                src={profileImage}
                style={{  width: "7em", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title className="text-center">Joko Widodo</Card.Title>
                <Row>
                    <Col lg={5}>
                        <p className="text-start fw-bold" style={normalFont}>
                            Amount
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Bank Name
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Account Number
                        </p>
                    </Col>
                    <Col lg={7}>
                        <p className="text-start" style={normalFont}>
                            Rp.100.000
                        </p>
                        <p className="text-start" style={normalFont}>
                            BCA
                        </p>
                        <p className="text-start" style={normalFont}>
                            4390821948291
                        </p>

                    </Col>

                </Row>
                <Row>
                    <Col lg={4}>
                        <Button variant="primary" style={normalFont}>
                            Accept
                        </Button>
                    </Col>
                    <Col lg={4}/>
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

export default AdminUserCard;
