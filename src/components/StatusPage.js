import * as actions from '../actions/StatusActions'
import * as msgActions from '../actions/MsgActions'
import React from 'react'
import StatusList from './StatusList'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import {bindActionCreators} from 'redux'
import Message from 'material-ui/svg-icons/communication/message'

export const StatusPage = (props) => {
  let onRegionClick = region => {
    props.navigateToRegion(region)
  }

  return (
    <div>
      <div className={'list-header'}>
        Teams
        <Message className={'chat-button'} onClick={() => { props.navigateToBanditChat() }} />
      </div>

      <StatusList
        onClick={onRegionClick}
        regions={props.data.regions} />
    </div>
  )
}

StatusPage.propTypes = {
  regions: React.PropTypes.array
}

function mapStateToProps (state, ownprops) {
  return {
    data: state.statusReducer,
    navigateToRegion: (region) => browserHistory.push({
      pathname: `/teams/${region.id}`,
      state: region
    })
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...actions,
    navigateToBanditChat: msgActions.openChat
  },
  dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPage)
