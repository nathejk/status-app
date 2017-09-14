import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import * as msgActions from '../actions/MsgActions'
import {List} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ConnectionOff from 'material-ui/svg-icons/action/perm-scan-wifi'
import ConnectionOn from 'material-ui/svg-icons/notification/wifi'
import {red500, green500} from 'material-ui/styles/colors'
class ChatPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {message: ''}
  }

  setMessage = (event, msg) => {
    this.setState({message: msg})
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message, this.props.channel)
    this.setState({message: ''})
  }

  parseCreatedAtFromNow = (createdAt) => {
    return typeof createdAt.fromNow === 'function' ? createdAt.fromNow() : moment(createdAt).fromNow()
  }

  renderMessages = () => {
    if (!this.props.messages) {
      return
    }

    return this.props.messages.map(m => {
      const messageClass = `${m.user.id === this.props.user.id ? 'user-message' : ''} chat-message`
      return (
        <div key={m.id} className={messageClass}>
          <div>
            <strong className='user'>{m.user.name}</strong>{this.parseCreatedAtFromNow(m.createdAt)}
          </div>
          <div className='text'>
            {m.message}
          </div>
        </div>
      )
    })
  }

  renderConnection = () => {
    return this.props.connected ? <ConnectionOn className={'connection-state'} color={green500} /> : <ConnectionOff className='connection-state' color={red500} />
  }

  render () {
    return (
      <div className='chat'>
        <div className='list-header'>
          {this.props.channel} Chat{this.renderConnection()}
        </div>

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
          <RaisedButton label='Send' disabled={!this.state.message} onClick={this.sendMessage} />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownprops) {
  return {
    channel: state.msg.channel,
    messages: state.msg.channelMessages,
    connected: state.msg.connected,
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
