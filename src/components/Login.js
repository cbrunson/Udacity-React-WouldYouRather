import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './styles/Login.css';
import './styles/global.css';
import logo from '../images/wouldyourather-1.png';
import { handleSetAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        selectedId: null
    };

    handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        this.setState(() => (
            {selectedId: value}
        ));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handleSetAuthedUser(this.state.selectedId));

        let locationState = this.props.location.state;
        if (locationState && locationState.from) {
            this.props.history.push(locationState.from);
        } else {
            this.props.history.push('/home');
        }
    };

    componentDidMount() {
        if (!this.props.userIds && !this.props.userIds[0]) {
            return;
        }

        this.setState(() => (
            {selectedId: this.props.userIds[0]}
        ));
    }

    render() {
        const { userIds } = this.props;
        const { selectedId } = this.state;

        return (
            <Container className='content-container rounded shadow-lg pb-4 non-responsive'>
                <Row className='bg-light rounded-top p-2 border-bottom'>
                    <Col>
                        <h5 className='font-weight-bold'>Welcome to the Would You Rather App!</h5>
{/*                         <h6 className='font-weight-light'>Please sign in to continue</h6>
 */}                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src={logo} alt='Would You Rather Logo' className='mt-5 logoImg' />
                        <h4 className='mt-5 font-weight-bold'>Sign In</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3'>
                        {
                            selectedId &&
                                 <select
                                    onChange={(e)=> this.handleChange(e)}
                                    value={selectedId}
                                    className='p-2 d-block w-100 rounded'>
                                    {
                                        userIds.map((id) => (
                                            <option key={id}>
                                                {id}
                                            </option>
                                        ))
                                    }
                                </select>
                        }
                        <Button className='p-2 w-100 mt-3'
                            onClick={(e) => this.handleSubmit(e)}>
                            Log in
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users).sort(),
    }
}

export default connect(mapStateToProps)(Login);