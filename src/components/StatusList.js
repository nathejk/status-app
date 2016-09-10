import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import StatusListItem from './StatusListItem'

const StatusList = (props) => {
  let listItems = props.regions === undefined ? null : props.regions.map((region) => {
    return (
        <StatusListItem
          key={region.id}
          teams={region.teams}
          name={region.name}
          scans={region.scans}
          onClick={() => console.log(region.name)} />)
    });

  return (
    <List>
      {listItems}
    </List>
  );
};

StatusList.propTypes = {
  regions: React.PropTypes.array,
}

export default StatusList;
