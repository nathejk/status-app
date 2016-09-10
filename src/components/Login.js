import React, {Component, PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

class Login extends Component {
    render () {
        return (
            <div>
                <TextField floatingLabelText="Username" name="phone"/>
                <RaisedButton label="Login"/>
            </div>
        )
    }
}

const styles = {
    
} 

export default Login