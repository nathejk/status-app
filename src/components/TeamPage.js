import * as actions from '../actions/StatusActions'
import React from 'react'
import TeamList from './TeamList'
import TeamListItem from './TeamListItem'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export const TeamPage = (props) => {
  let memberItems = props.region.members.map(member => {
    return (
      <TeamListItem
        key={member.id}
        {...member}
        onClick={() => console.log(`name: ${member.name}`)} />
    )
  })

  return (
    <div>
      <h2 className='alt-header'>{props.region.name}</h2>
      {memberItems}
      <TeamList
        teams={props.region.teams} />
    </div>
  )
}

TeamPage.propTypes = {
  region: React.PropTypes.object
}

function mapStateToProps (state, ownProps) {
  if (state.routing.locationBeforeTransitions) {
    return {
      region: state.routing.locationBeforeTransitions.state
    }
  }

  return {
    region: state.statusReducer.find(region => region.id === state.params.id)
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
)(TeamPage)
