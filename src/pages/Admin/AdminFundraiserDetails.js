//Library
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'

//Styles
import {
    Button,
    Container,
    Row,
    Col,
    ProgressBar,
    Form,
    Image,
    Breadcrumb,
    Modal
} from 'react-bootstrap';


//Assets

const AdminFundraiserDetails = () => {
    //State
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [walletAmount, setWalletAmount] = useState(10000)
    const [donateAmount, setDonateAmount] = useState(0)
    const [isAdmin, setAdmin] = useState(true);


    //Method
    const toggleDialog = () => {
        setShow(!show)
    }

    const handleAccept = () =>{
        
    }
    const handleReject = () =>{
        
    }

    //Component
    const acceptButton = 
        <Button variant="primary" type="submit" className="w-50" onClick={() => handleAccept()}>
            Accept
        </Button>
    const rejectButton = 
        <Button variant="danger" type="submit" className="w-50" onClick={() => handleReject()}>
            Reject
        </Button>

    if(!isAdmin)
        history.push('/');
    
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-5">
                <Breadcrumb className="px-2 path">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Campaign</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="login-container  p-3" style={{ width: "32em", backgroundColor: "white", borderRadius: "1em" }}>
                    <Row>
                        <Col className="d-flex align-items-center">
                            <Gravatar email="jokowi@pdip.com" size={200} className="m-auto mt-2" style={{ borderRadius: "20em" }} />
                        </Col>
                    </Row>
                    <Container>
                        <h4 className="my-3">Joko Widodo</h4>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in th.
                        </p>
                        <Row>
                            <Col lg={6} className="text-center">
                                {acceptButton}
                            </Col>
                            
                            <Col lg={6} className="text-center">
                                {rejectButton}
                            </Col>
                        </Row>
                    </Container>
                </Container>
                {/* {dialogLogged} */}
            </div>
        </div>
    )
}

export default AdminFundraiserDetails