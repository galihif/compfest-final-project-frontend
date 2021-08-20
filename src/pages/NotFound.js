import { Col, Container, Image, Row, Button } from "react-bootstrap"


import emptyState from '../assets/404Page.svg'

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container className="m-5 p-5 d-flex align-items-center justify-content-center" style={{ width: "40em",height:"30em"}}>
                <div>
                    <Row>
                        <Col>
                            <Image src={emptyState}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="text-center" >404</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6 className="text-center" >Page Not Found</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" >
                            <Button variant="primary" type="" href="/">
                                Home
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default NotFound