import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';

import './styles/QuestionData.css';

const QuestionData = ({option, totalVotes, authedUser}) => {
    return (
        <Container fluid
            className={'border rounded my-3 p-3 ' + (option.votes.length/totalVotes > 0.5
                ? 'winner border-success'
                : 'border-danger')}>

            {
                option.votes.includes(authedUser) &&
                    <Row className='mb-2'>
                        <Col className='d-flex justify-content-end'>
                            <Badge variant='secondary'>Your Pick</Badge>
                        </Col>
                    </Row>
            }

            <Row>
                <Col>
                    <div className='text-left font-weight-bold question-text'>{option.text}</div>
                    <ProgressBar className='my-2'
                                 now={option.votes.length/totalVotes*100}
                                 label={(totalVotes !== 0)
                                     ? `${(option.votes.length/totalVotes*100).toFixed(2)}%`
                                     : '0%'}
                                 variant={
                                     option.votes.length/totalVotes >= 0.5
                                        ? 'success'
                                         : 'danger'
                                 } />
                    <div className='font-weight-bold question-count'>
                        {`${option.votes.length} out of ${totalVotes} votes`}</div>
                </Col>
            </Row>
        </Container>
    );
};

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionData);