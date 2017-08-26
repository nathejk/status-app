import * as types from '../constants/actionTypes'

export const login = (phone) => ({
  type: types.REQUEST_POSTS,
  phone
})

export const requestPosts = (phone) => ({
  type: types.REQUEST_POSTS,
  phone
})

export const logOut = () => ({
  type: types.LOG_OUT,
  logOutAt: Date.now()
})

export const receivePosts = (phone, data) => ({
  type: types.RECEIVE_POSTS,
  phone,
  data: data.default || data, // TODO: MOCK ISSUE?
  receivedAt: Date.now()
})

// export function fetchPostsIfNeeded (phone) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), phone)) {
//       return dispatch(fetchPosts(phone))
//     }
//   }
// }
