import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Container, Col, Row, Form} from 'react-bootstrap';

import './styles/AnswerQuestion.css';
import { Redirect } from 'react-router-dom';
import {handleAnswerQuestion} from "../actions/questions";

class AnswerQuestion extends Component {
    state = {
        selectedOption: 'optionOne',
        toQuestion: false
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const answer = {
            'authedUser': this.props.authedUser,
            'qid': this.props.match.params.id,
            'answer': this.state.selectedOption
        };

        this.props.dispatch(handleAnswerQuestion(answer));

        this.setState(() => (
            {toQuestion: true}
        ))
    };

    setOption = (e) => {
        let value = e.target.value;

        this.setState(() => (
            {selectedOption: value}
        ));
    };

    render() {
        const {optionOneText, optionTwoText, avatarURL, author, users} = this.props;

        if (!author) {
            return <Redirect to='/not-found' />
        }

        if (this.state.toQuestion) {
            return <Redirect to={`/question/${this.props.match.params.id}`}/>
        }

        return (
            <Container className='content-container rounded non-responsive'>
                <Row className='py-3 bg-light question-header rounded'>
                    <Col xs={4} className='d-flex justify-content-center'>
                        <div className='d-inline-block font-weight-bold'>{users[author].name} asks</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className='border-right d-flex justify-content-center align-items-center p-3'>
                        <img className='rounded-circle question-avatar' src={avatarURL} alt='avatar' />
                    </Col>
                    <Col className='text-left p-3'>
                        <h3 className='font-weight-bold'>Would You Rather...</h3>
                        <Form onChange={(e) => this.setOption(e)} onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group controlId='option1' className='mb-2'>
                                <Form.Check type='radio' name='options' label={optionOneText} value='optionOne' />
                                <Form.Check type='radio' name='options' label={optionTwoText} value='optionTwo' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='submit' className='btn btn-primary bg-primary' value='Submit'/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps({users, authedUser, questions}, ownProps) {
    const id = ownProps.match.params.id;
    const question = questions[id];

    return {
        author: question ? questions[id].author : null,
        avatarURL: question ? users[questions[id].author].avatarURL : null,
        optionOneText: question ? questions[id].optionOne.text : null,
        optionTwoText: question ? questions[id].optionTwo.text : null,
        users,
        authedUser
    };
}

export default connect(mapStateToProps)(AnswerQuestion);