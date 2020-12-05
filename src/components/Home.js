import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Question from './Question';

import './styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'selectedTab' : 0
        }
    }

    changeTab(tabNo) {
        if (this.state.selectedTab === tabNo) {
            return;
        }

        this.setState(() => (
            {'selectedTab': tabNo}
        ));
    }

    render() {
        const UNANSWERED_TAB = 0;
        const ANSWERED_TAB = 1;

        const { selectedTab } = this.state;
        const { answeredIds, unansweredIds } = this.props;

        return (
            <Container className='content-container rounded non-responsive'>
                <Row className='border-bottom'>
                    <Col className='unanswered-tab px-0'>
                        <Button onClick={() => this.changeTab(UNANSWERED_TAB)}
                                className={'tab-button-left py-3 w-100 font-weight-bold ' + (selectedTab === 0
                                    ? 'bg-light text-primary'
                                    : 'bg-white text-dark')}>
                            Unanswered Questions
                        </Button>
                    </Col>
                    <Col className='answered-tab px-0'>
                        <Button onClick={() => this.changeTab(ANSWERED_TAB)}
                                className={'py-3 tab-button-right w-100 font-weight-bold ' + (selectedTab === 1
                                    ? 'bg-light text-primary'
                                    : 'bg-white text-dark')}>
                            Answered Questions
                        </Button>
                    </Col>
                </Row>
                {
                    selectedTab === 0 &&
                    <Row>
                        <Col className='mx-5'>
                            {
                                unansweredIds.length > 0
                                    ? <ul className='pl-0'>
                                        {
                                            unansweredIds.map((id) => (
                                                <li key={id}>
                                                    <Question id={id} answered={false} />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    : <h4>No unanswered questions</h4>
                            }

                        </Col>
                    </Row>
                }
                {
                    selectedTab === 1 &&
                    <Row>
                        <Col className='mx-5'>
                            {
                                answeredIds.length > 0
                                    ? <ul className='pl-0'>
                                        {
                                            answeredIds.map((id) => (
                                                <li key={id}>
                                                    <Question id={id} answered={true} />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    : <h4>No answered questions</h4>
                            }
                        </Col>
                    </Row>
                }

            </Container>
        );
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    const answeredIds = Object.keys(users[authedUser].answers)
        .sort((a, b) => (
            users[authedUser].answers[b].timestamp - users[authedUser].answers[a].timestamp
        ));

    const unansweredIds = Object.keys(questions).filter((questionId) => (
            !answeredIds.includes(questionId)
        )).sort((a, b) => (
            questions[b].timestamp - questions[a].timestamp
        ));

    return {
        answeredIds: answeredIds,
        unansweredIds: unansweredIds ,
        authedUser
    }
}

export default connect(mapStateToProps)(Home);