import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

export function login(phone) {
return dispatch => {
    dispatch(requestPosts(phone))
    return fetch(`http://localhost:3000/Home/About`, {
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
      });
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response)
    return response
  } else {
    // console.log(response)
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

function receivePosts(phone, json) {
  // console.log(phone)
  // console.log(json)
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