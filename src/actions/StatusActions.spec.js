import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './StatusActions';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import MockDate from 'mockdate';
import chai, { expect } from 'chai';

chai.use(sinonChai);

describe('Actions', () => {
  let dateModified;
  before(() => {
    MockDate.set(new Date());
  });
  after(() => MockDate.reset());

  const appState = {
    regions: [{
      id: 1
    },{
      id: 2
    }]
  };

  it('should create an action to select a region', () => {
    const dispatch = sinon.spy();
    const expected = {
      type: ActionTypes.SELECT_REGION,
      region: appState.regions[1]
    };

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.regionSelected(appState))).to.equal('function');
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.regionSelected(appState.regions[1])(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).to.have.been.calledWith(expected);
  });
});
