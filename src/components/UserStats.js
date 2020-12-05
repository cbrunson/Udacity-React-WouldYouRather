import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './styles/UserStats.css';
import './styles/global.css';

const UserStats = ({user}) => {
    return (
        <Container fluid className='container-border my-3 p-3 rounded'>
            <Row>
                <Col xs={3} className='border-right border-light mr-2'>
                    <img className='rounded-circle' src={user.avatarURL} alt='avatar'/>
                </Col>
                <Col className='container-border rounded text-left'>
                    <h4 className='font-weight-bold'>{user.name}</h4>
                    <div className='w-100'>
                        Answered Questions <span className='float-right font-weight-bold'>{Object.keys(user.answers).length}</span>
                    </div>
                    <div className='w-100'>
                        Created Questions <span className='float-right font-weight-bold'>{user.questions.length}</span>
                    </div>
                </Col>
                <Col xs={2} className='container-border mx-3 rounded'>
                    <Row className='container-border-bottom font-weight-bold'>
                        <Col>
                            Score
                        </Col>
                    </Row>
                    <Row className='justify-content-center mt-3'>
                        <Col xs={4} className='d-flex p-0'>
                            <div className='badge-number font-weight-bold bg-success text-white rounded-circle w-100'>
                                {Object.keys(user.answers).length+user.questions.length}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserStats;