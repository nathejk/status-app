import * as actions from '../actions/StatusActions'
import React from 'react'
import StatusList from './StatusList'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export const StatusPage = (props) => {
  let onRegionClick = region => {
    console.log(props)
    props.actions.regionSelected(region)
  }

  return (
    <div>
      <h2 className='alt-header'>Status</h2>
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
    data: state.statusReducer
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
)(StatusPage)
