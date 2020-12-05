import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import UserStats from './UserStats';
import './styles/global.css';

const Leaderboard = ({users}) => {
    return (
        <Container className='content-container rounded non-responsive'>
            <Row className='rounded-top py-2 border-bottom bg-light'>
                <Col>
                    <h3 className='font-weight-bold'>Leaderboard</h3>
                </Col>
            </Row>
            {
                users.map((user) => (
                   <Row key={user.id}>
                       <Col>
                           <UserStats user={user} />
                       </Col>
                   </Row>
                ))
            }
        </Container>
    );
};

function mapStateToProps({users}) {
    return {
        users: Object.keys(users).map((userID) => (
            users[userID]
        )).sort((a, b) => (
            (Object.keys(b.answers).length+b.questions.length) -
            (Object.keys(a.answers).length+a.questions.length)
        ))
    }
}

export default connect(mapStateToProps)(Leaderboard);