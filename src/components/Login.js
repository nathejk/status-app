import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Login extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {phone: ''}
  }

  handleChange = (event) => {
    this.setState({phone: event.target.value})
  }

  render () {
    return (
      <div>
        <TextField errorText={this.props.error} value={this.state.phone} onChange={this.handleChange} floatingLabelText='Telefon nr' name='phone' />
        <RaisedButton label='Login' onClick={() => this.props.onClick(this.state.phone)} />
      </div>
    )
  }
}

export default Login
