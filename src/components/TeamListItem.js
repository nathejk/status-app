import React from 'react'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline'

const TeamListItem = props => {
  let avatar
  if (props.pictureUrl) {
    avatar = <Avatar src={props.pictureUrl} />
  } else {
    avatar = <SocialPersonOutline />
  }

  let name = props.number ? `${props.number} - ${props.name}` : props.name

  return (
    <div>
      <Divider />
      <ListItem
        onClick={() => props.onClick()}
        primaryText={name}
        secondaryText={
          <a href={`tel:${props.phone}`}>
            {props.phone}
          </a>
        }
        leftAvatar={avatar}
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
