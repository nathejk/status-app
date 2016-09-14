import React from 'react';
import {browserHistory} from 'react-router'
import Login from './Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/LoginActions';
import {AUTHENTICATED, DEFAULT, ERROR, LOADING} from '../constants/loginStates'
import CircularProgress from 'material-ui/CircularProgress';


export const HomePage = (props) => {
  let onLogin = phone => {
    props.actions.login(phone)
  }

console.log(props.loginState)
  if (props.loginState === AUTHENTICATED) {
    browserHistory.push('/status')
  }

  return (
    <div>
        <div style={props.spinnerStyles}>
          <CircularProgress />
        </div>
        <Login error={props.errorMessage} onClick={onLogin}/>
    </div>
  );
};

function mapStateToProps(state, ownprops) {
  const errorMessage = 'Login failed try again'
  return {
    data: state.loginReducer,
    loginState: state.loginReducer.loginState,
    errorMessage: state.loginReducer.loginState === ERROR ? errorMessage : null,
    spinnerStyles: {
      display: state.loginReducer.loginState === LOADING ? 'block' : 'hidden'
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);