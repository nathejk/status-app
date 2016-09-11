import React, { PropTypes } from 'react'
import { Link, IndexLink, browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import {grey50} from 'material-ui/styles/colors'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      open: false
    }
  }

  handleMenuItemSelected = (path) => {
    browserHistory.push(path)
    this.handleRequestClose()
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title="Nathejk"
          iconElementLeft={
            <div>
              <NavigationMenu color={grey50} onClick={this.handleTouchTap} />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                animation={PopoverAnimationVertical}>
                <Menu>
                  <MenuItem primaryText="Home" onClick={() => this.handleMenuItemSelected('/')}/>
                  <MenuItem primaryText="Status" onClick={() => this.handleMenuItemSelected('/status')}/>
                  <MenuItem primaryText="Sign out" onClick={() => this.handleMenuItemSelected('/')}/>
                </Menu>
              </Popover>
            </div>
          }
          style={{backgroundColor:'black'}}
        />
        <br/>
        <div className='page-wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App


