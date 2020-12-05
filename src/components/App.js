import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';


// Components
import Login from './Login';
import Home from './Home';
import NewQuestion from './NewQuestion';
import QuestionDetails from './QuestionDetails';
import AnswerQuestion from './AnswerQuestion';
import Navigation from './Navigation';
import Leaderboard from './Leaderboard';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

// Others
import './styles/App.css';
import './styles/global.css';
import { handleReceiveUsers } from '../actions/users';
import { handleReceiveQuestions } from '../actions/questions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleReceiveUsers());
        this.props.dispatch(handleReceiveQuestions());
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <Container fluid className='App'>
                        <Row className='mb-5'>
                            <Col className='p-0 position-fixed nav'>
                                <Navigation />
                            </Col>
                        </Row>
                        {this.props.loading === true
                            ? null
                            : <Row className='justify-content-center content-wrapper'>
                                <Col>
                                    <Switch>
                                        <Route path='/' exact component={Login} />
                                        <PrivateRoute path='/home' component={Home} />
                                        <PrivateRoute path='/add' component={NewQuestion} />
                                        <PrivateRoute path='/question/:id' component={QuestionDetails} />
                                        <PrivateRoute path='/answer-question/:id' component={AnswerQuestion} />
                                        <PrivateRoute path='/leaderboard' component={Leaderboard} />
                                        <Route component={NotFound} />
                                    </Switch>
                                </Col>
                            </Row>
                        }
                    </Container>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ users, questions }) {
    return {
        users,
        loading: !users ||
            !questions ||
            Object.keys(users).length === 0 ||
            Object.keys(questions).length === 0
    }
}

export default connect(mapStateToProps)(App);
