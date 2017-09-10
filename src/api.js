import fetch from 'isomorphic-fetch'

require('es6-promise').polyfill()

export default {
  login (phone) {
    return fetch(`/proxy?http://tilmelding.nathejk.dk/status?phone=${phone}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
    .then(parseJSON)
  }
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}
