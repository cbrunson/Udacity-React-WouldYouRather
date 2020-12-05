import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = (props) => {
    return (
        <Container className='content-container rounded non-responsive'>
            <Row>
                <Col>
                    <h1>Page not found</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;