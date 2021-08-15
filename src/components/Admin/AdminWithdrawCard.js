
//Library
import React from "react";

//Styles
import "../Card.scss";
import { Button, Row, Col, Card } from "react-bootstrap";
import Gravatar from 'react-gravatar';


const AdminWithdrawCard = (props) => {
    const normalFont = { fontSize: "12px" };
    const { name, 
            amount,
            email,
            bankName,
            accountNumber} = props;
    return (
        <Card className="campaign-card" style={{ width: "20em" }}>
            <Gravatar email={email} size={100} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Row>
                    <Col lg={5}>
                        <p className="text-start fw-bold" style={normalFont}>
                            Amount
                        </p>
                        <p className="text-start fw-bold" style={normalFont}>
                            Email
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
                            Rp.{amount}
                        </p>
                        <p className="text-start" style={normalFont}>
                            {email}
                        </p>
                        <p className="text-start" style={normalFont}>
                            {bankName}
                        </p>
                        <p className="text-start" style={normalFont}>
                            {accountNumber}
                        </p>

                    </Col>

                    <Col lg={5}>
                        <p className="text-start fw-bold" style={normalFont}>
                            Campaign
                        </p>
                    </Col>

                    <Col sm={7}>
                        <a href='/'>tets</a>
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

export default AdminWithdrawCard;
