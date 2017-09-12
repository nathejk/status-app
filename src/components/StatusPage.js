import * as actions from '../actions/StatusActions'
import * as msgActions from '../actions/MsgActions'
import React from 'react'
import StatusList from './StatusList'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import {bindActionCreators} from 'redux'

export const StatusPage = (props) => {
  let onRegionClick = region => {
    props.navigateToRegion(region)
  }

  return (
    <div>
      <h2 className='alt-header'>Teams</h2>
      <i className={'material-icons'} onClick={() => props.navigateToBanditChat()}>question_answer</i>
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
