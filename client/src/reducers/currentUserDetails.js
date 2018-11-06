import {GET_CURRENT_USER} from '../actions/users'

let initialState = null

export default function (state = initialState, {type, payload}) {
	switch (type) {
    case GET_CURRENT_USER:
      return payload
    default:
      return initialState
  }
}