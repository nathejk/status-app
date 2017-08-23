import * as types from '../constants/actionTypes'

export function regionSelected (region) {
  return (dispatch) => {
    return dispatch({
      type: types.SELECT_REGION,
      region
    })
  }
}
