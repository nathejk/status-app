import * as actions from '../actions/StatusActions'
import * as msgActions from '../actions/MsgActions'
import React from 'react'
import TeamList from './TeamList'
import TeamListItem from './TeamListItem'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Message from 'material-ui/svg-icons/communication/message'
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
      <h2 className='alt-header'>{props.region.name} </h2>
      <Message onClick={() => { props.navigateToBanditChat(props.region.name, props.region.id) }} />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...actions,
    navigateToBanditChat: msgActions.openChat
  },
  dispatch)
}


// function mapDispatchToProps (dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch,
//       navigateToBanditChat: msgActions.openChat
//   }
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)
