import * as actions from '../actions/StatusActions'
import React from 'react'
import TeamList from './TeamList'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export const TeamPage = (props) => {
  return (
    <div>
      <h2 className="alt-header">{props.region.name}</h2>
      <TeamList
        teams={props.region.teams}/>
    </div>
  )
}

TeamPage.propTypes = {
  region: React.PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  let newState
  if (state.routing.locationBeforeTransitions) {
    return {
      region: state.routing.locationBeforeTransitions.state
    }
  }

  return {
    region: state.statusReducer.find(region => region.id === state.params.id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)


