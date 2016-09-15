import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

export function login(phone) {
return dispatch => {
    dispatch(requestPosts(phone))
    return fetch(`http://localhost:3000/status?phone=${phone}`, {
      // return fetch(`http://tilmelding.nathejk.dk/status?phone=${phone}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(receivePosts(phone, json)))
      .catch(function(error) {
        console.error(error);
        console.error(error.stack);
        dispatch({
          type: types.LOG_IN_FAILED,
          error: error
        })
      });
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
      error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}


function requestPosts(phone) {
  return {
    type: types.REQUEST_POSTS,
    phone
  }
}

export function logOut() {
  return {
    type: types.LOG_OUT,
    logOutAt: Date.now()
  }
}

function receivePosts(phone, json) {
  return {
    type: types.RECEIVE_POSTS,
    phone,
    data: json,
    receivedAt: Date.now()
  }
}

export function fetchPostsIfNeeded(phone) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), phone)) {
      return dispatch(fetchPosts(phone))
    }
  }
}