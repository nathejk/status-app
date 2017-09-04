import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import * as actions from '../actions/LoginActions'
import { ERROR, LOADING } from '../constants/loginStates'
import CircularProgress from 'material-ui/CircularProgress'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export const HomePage = (props) => {
  const listItems = props.messages.map(m => {
    // return (<ListItem
      // key={m.id}
      // primaryText={`${m.user.name}   ${m.timestamp}`}
      // secondaryText={m.message}
      // />)
    return (
      <div className='chat-message'>
        <div>
          <strong className="user">{m.user.name}</strong>{m.createdAt.fromNow()}
        </div>
        <div className='text'>
         {m.message}
        </div>
      </div>
    )
    })

  return (
    <div className='chat'>
    <h1>
    Bandit Chat
    </h1>
      <div id={"chat"} className='top-container'>

        <List id={"chatList"}>
          {listItems}
        </List>
      </div>
      <div className='input-container'>
        <TextField
          hintText='Enter message'
          multiLine
          fullWidth
          rows={1}
          rowsMax={1}
          />
        <RaisedButton label='Send' onClick={() => this.props.onClick(this.state.phone)} />
      </div>
    </div>
  )
}

function mapStateToProps (state, ownprops) {
  return {
    messages: state.msg.messages,
    user: state.loginReducer.user
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
