import React from 'react'
import {List} from 'material-ui/List'
import TeamListItem from './TeamListItem'

const TeamList = (props) => {
  let listItems = props.teams === undefined ? null : props.teams.map((team) => {
    let memberItems = team.members.map(member => {
      return (
        <TeamListItem
          key={member.id}
          {...member}
          onClick={() => console.log(`name: ${member.name} team: ${team.name}`)} />
      )
    })

    return (
      <List
        key={team.id}>
        <h3>
          {team.name}
        </h3>
        {memberItems}
      </List>)
  })

  return (
    <div>
      {listItems}
    </div>
  )
}

TeamList.propTypes = {
  region: React.PropTypes.array
}

export default TeamList
