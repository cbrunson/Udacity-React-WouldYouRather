import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './styles/Question.css';

class Question extends Component {
    state = {
        toQuestion: false,
        toAnswer: false
    };

    displayDetails() {
        this.setState(() => {
            return this.props.answered
                ? {toQuestion: true}
                : {toAnswer: true}
        });
    }

    render() {
        const { question, user } = this.props;
        const { toQuestion, toAnswer } = this.state;

        if (toQuestion) {
            return <Redirect to={`question/${this.props.id}`} />
        }

        if (toAnswer) {
            return <Redirect to={`answer-question/${this.props.id}`} />
        }

        return (
            <Container fluid className='my-3 question rounded my-3'>
                <Row className='py-3 bg-light question-header'>
                    <Col xs={4} className='d-flex justify-content-center'>
                        <div className='d-inline-block font-weight-bold'>{`${user.name} asks`}</div>
                    </Col>
                </Row>
                <Row className='py-4'>
                    <Col xs={4} className='d-flex justify-content-center align-items-center'>
                        <img src={user.avatarURL} alt='avatar' className='rounded-circle'/>
                    </Col>
                    <Col>
                        <div className='question-data mb-2'>
                            <div className='font-weight-bold'>Would you rather</div>
                            <div className='question-text'>{question.optionOne.text}</div>
                            <Button onClick={() => this.displayDetails()} className='mt-2'>View Poll</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps({ users, questions }, { id }) {
    return {
        question: questions[id],
        user: users[questions[id].author],
        users
    }
}

export default connect(mapStateToProps)(Question);