import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as msgActions from '../actions/MsgActions'
import {List} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class ChatPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {message: ''}
  }

  setMessage = (event, msg) => {
    this.setState({message: msg})
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
    this.setState({message: ''})
  }

  renderMessages = () => {
    if (!this.props.messages) {
      return
    }

    return this.props.messages.map(m => {
      const messageClass = `${m.user.id === this.props.user.id ? 'user-message' : ''} chat-message`
      return (
        <div className={messageClass}>
          <div>
            <strong className='user'>{m.user.name}</strong>{m.createdAt.fromNow()}
          </div>
          <div className='text'>
            {m.message}
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className='chat'>
        <h1>
          Bandit Chat
        </h1>
        <div id={'chat'} className='top-container'>
          <List id={'chatList'}>
            {this.renderMessages()}
          </List>
        </div>
        <div className='input-container'>
          <TextField
            id='chat-input'
            onFocus={() => document.getElementById('chat-input').scrollIntoView(true)}
            hintText='Enter message'
            value={this.state.message}
            onChange={this.setMessage}
            multiLine
            fullWidth
            rows={1}
            rowsMax={1}
            />
          <RaisedButton label='Send' onClick={this.sendMessage} />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownprops) {
  return {
    messages: state.msg.messages,
    user: state.loginReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    sendMessage: msgActions.sendMessage
  },
  dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage)
