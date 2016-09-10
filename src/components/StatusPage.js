import * as actions from '../actions/fuelSavingsActions';
import React from 'react';
import StatusList from './StatusList'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


export const StatusPage = (props) => {
  console.log(props)
  return (
    <div>
      <h2 className="alt-header">Status</h2>
      <StatusList
        regions={props.data.regions}/>
    </div>
  );
};

StatusPage.propTypes = {
  regions: React.PropTypes.array,
}

function mapStateToProps(state) {
  return {
    data: state.statusReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPage);


