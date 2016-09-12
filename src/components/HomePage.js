import React from 'react';
import {Link} from 'react-router';
import Login from './Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/LoginActions';
// var loginButton;
// if (loggedIn) {
//   loginButton = <LogoutButton />;
// } else {
//   loginButton = <LoginButton />;
// }

export const HomePage = (props) => {
  let onLogin = phone => {
    console.log(props)
    console.log(phone)
    props.actions.login(phone)
  }

  return (
    <div>
        <Login onClick={onLogin}/>
    </div>
  );
};

function mapStateToProps(state, ownprops) {
          console.log(state)
  return {
    data: state.loginReducer
  };
}

function mapDispatchToProps(dispatch) {
          console.log(actions)
          console.log(dispatch)
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);