import React, {PropTypes} from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const TeamListItem = props => {
  let memberCount = props.members

  return (
    <div>
      <Divider/>
      <ListItem
        onClick={() => props.onClick()}
        primaryText={props.name}
        secondaryTextLines={2}
        rightAvatar= {
          <a href={`tel:${props.phone}`}>
            {props.phone}
          </a>
        }
      />
    </div>
  )
}

TeamListItem.propTypes = {
  members: React.PropTypes.array,
  name: React.PropTypes.string,
  scans: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default TeamListItem