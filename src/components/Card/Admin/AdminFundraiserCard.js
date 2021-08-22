//Library
import React from "react";

//Styles
import "./Card.scss";
import {  Row, Col, Card } from "react-bootstrap";
import Gravatar from "react-gravatar";
import { useHistory } from "react-router-dom";

const AdminFundraiserCard = (props) => {
    const normalFont = { fontSize: "12px" };
    const history = useHistory();
    // data
    const { email, 
            title, 
            description,
            id,
            date } = props;
    const dateObject = new Date(date);
    const dateFormat = `${dateObject.getDay()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`;

    // Component
    const CardRow = (props) =>{
            const {title,data} = props;
            return (
                <Row className="card-row">
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
        }
    return (
        <Card className="campaign-card m-2" style={{ width: "20em" }} onClick={()=> history.push(`/admin/fundraiser/${id}`)}>
            
            <Gravatar email={email} size={100} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
            
            <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
                <CardRow 
                    title='Email'
                    data={email}
                />
                <CardRow 
                    title='Description'
                    data={description}
                />
                <CardRow 
                    title='Date'
                    data={dateFormat}
                />
            </Card.Body>
        </Card>
    );
};

export default AdminFundraiserCard;