import React from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/LoginActions'
import { ERROR, LOADING } from '../constants/loginStates'
import CircularProgress from 'material-ui/CircularProgress'

export const HomePage = (props) => {
  let onLogin = phone => {
    props.actions.login(phone)
  }

  return (
    <div className='login-page-container'>
      <div className={props.spinnerStyle}>
        <CircularProgress />
      </div>
      <Login error={props.errorMessage} onClick={onLogin} />
    </div>
  )
}

function mapStateToProps (state, ownprops) {
  const errorMessage = 'Login failed try again'
  return {
    data: state.loginReducer,
    loginState: state.loginReducer.loginState,
    errorMessage: state.loginReducer.loginState === ERROR ? errorMessage : null,
    spinnerStyle: state.loginReducer.loginState === LOADING ? 'login-spinner-active' : 'login-spinner-hidden'
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
