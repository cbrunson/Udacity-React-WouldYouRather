import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import QuestionData from './QuestionData';

import './styles/QuestionDetails.css';

class QuestionDetails extends Component {
    getTotalVotes() {
        const question = this.props.question;
        return question.optionOne.votes.length+question.optionTwo.votes.length;
    }

    render() {
        const {userName, userAvatar, question} = this.props;

        if (!question) {
            return <Redirect to='/not-found' />
        }

        return (
            <Container className='content-container rounded non-responsive'>
                <Row className='py-3 bg-light question-header rounded-top'>
                    <Col className='d-flex justify-content-start'>
                        <div className='d-inline-block font-weight-bold'>{`Asked by: ${userName}`}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className='d-flex justify-content-center align-items-center border-right'>
                        <img className="rounded-circle question-avatar" src={userAvatar} alt='test' />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5 className='my-3 font-weight-bold text-left'>Results:</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <QuestionData
                                    option={question.optionOne}
                                    totalVotes={this.getTotalVotes()} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <QuestionData
                                    option={question.optionTwo}
                                    totalVotes={this.getTotalVotes()} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps({ questions, users, authedUser }, ownProps) {
    const qid = ownProps.match.params.id;

    return {
        question: questions[qid],
        userAvatar: (questions[qid]) ? users[questions[qid].author].avatarURL : null,
        userName: (questions[qid]) ? users[questions[qid].author].name : null,
        authedUser
    };
}

export default connect(mapStateToProps)(QuestionDetails);
