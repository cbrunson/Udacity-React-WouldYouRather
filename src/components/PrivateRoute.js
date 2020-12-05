import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, authedUser, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            authedUser === null
                ? <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }} />
                : <Component {...props} />
        )} />
    );
};

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}


export default connect(mapStateToProps)(PrivateRoute);