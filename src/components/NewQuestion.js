import React, {Component} from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { handleSaveQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        toHome: false
    };

    constructor(props) {
        super(props);
        this.option1Input = React.createRef();
        this.option2Input = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const question = {
            optionOneText: this.option1Input.current.value,
            optionTwoText: this.option2Input.current.value,
            author: this.props.authedUser,
        };

        this.props.dispatch(handleSaveQuestion(question)).then(() => {
            this.setState(() => (
                {
                    toHome: true
                }
            ))
        });
    };

    render() {

        if (this.state.toHome) {
            return <Redirect to='/home' />
        }

        return (
            <Container className='content-container rounded non-responsive'>
                <Row className='rounded-top py-2 border-bottom bg-light'>
                    <Col>
                        <h3 className='font-weight-bold'>Create New Question</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='mt-2 mb-3 text-left'>Complete the question:</div>
                        <h5 className='mb-3 text-left font-weight-bold'>Would you rather...</h5>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId='option1' className='mb-2'>
                                <Form.Control ref={this.option1Input} type='text' placeholder='Enter Option 1 Text Here...' />
                            </Form.Group>
                            <div className='font-weight-bold'>OR</div>
                            <Form.Group controlId='option2' className='mt-2'>
                                <Form.Control ref={this.option2Input} type='text' placeholder='Enter Option 2 Text Here...' />
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

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);