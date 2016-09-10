import React, {PropTypes} from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const StatusListItem = props => {
  let memberCount = props.teams.map(team => team.members.length).reduce((a, b) => a + b, 0)
  let teamCount = props.teams.length

  return (
    <div>
      <Divider/>
      <ListItem
        onClick={() => props.onClick()}
        primaryText={props.name}
        secondaryText={
          <div>
            Teams: {teamCount}
            <br/>
            Members: {memberCount}
          </div>
        }
        secondaryTextLines={2}
        rightAvatar= {
          <div>
            {props.scans}
          </div>
        }
      />
    </div>
  )
}

StatusListItem.propTypes = {
  members: React.PropTypes.array,
  name: React.PropTypes.string,
  scans: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default StatusListItem