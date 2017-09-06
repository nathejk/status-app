import React from 'react'
import {List} from 'material-ui/List'
import StatusListItem from './StatusListItem'

const StatusList = (props) => {
  let listItems = props.regions === undefined ? null : props.regions.map((region) => {
    return (
      <StatusListItem
        key={region.id}
        teams={region.teams}
        name={region.name}
        scans={region.scans}
        onClick={() => props.onClick(region)} />
    )
  })

  return (
    <List>
      {listItems}
    </List>
  )
}

StatusList.propTypes = {
  regions: React.PropTypes.array
}

export default StatusList
