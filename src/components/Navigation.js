import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import {handleSetAuthedUser} from '../actions/authedUser';
import './styles/Navigation.css';
import './styles/global.css';

class Navigation extends Component {
    handleLogout() {
        this.props.dispatch(handleSetAuthedUser(null));
    }

    render() {
        const { authedUser, avatarURL, name } = this.props;

        return (
            <Container fluid className='p-0 bg-white shadow-lg non-responsive'>
                <Row>
                    <Col className='d-flex'>
                        <Navbar>
                            <Navbar.Brand>Would You Rather?</Navbar.Brand>
                            <Nav>
                                <LinkContainer to='/home'>
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/add'>
                                    <Nav.Link>New Question</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/leaderboard'>
                                    <Nav.Link>Leader Board</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar>
                    </Col>

                    {
                        authedUser &&
                            <Col className='d-flex align-content-center justify-content-end'>
                                <Navbar>
                                    <Nav>
                                        <Nav.Link className='text-dark' disabled>{`Welcome, ${name}`}</Nav.Link>
                                        <Nav.Link className='profile-img-container' disabled>
                                            <img
                                                className='rounded-circle mw-100 profile-img'
                                                src={avatarURL}
                                                alt={'avatar'}/>
                                        </Nav.Link>
                                        <LinkContainer to='/'>
                                            <Nav.Link onClick={() => this.handleLogout()}>Logout</Nav.Link>
                                        </LinkContainer>
                                    </Nav>
                                </Navbar>
                            </Col>
                    }
                </Row>

            </Container>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        avatarURL: (users && users[authedUser]) ? users[authedUser].avatarURL : null,
        name: (users && users[authedUser]) ? users[authedUser].name : null
    };
}

export default connect(mapStateToProps)(Navigation);