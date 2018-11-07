import {GET_CURRENT_USER, USER_LOGOUT, USER_LOGIN_FAILED} from '../actions/users'

let initialState = null

export default function (state = initialState, {type, payload}) {
	switch (type) {
    case GET_CURRENT_USER:
      return payload

    case USER_LOGOUT:
      return null
    
    case USER_LOGIN_FAILED:
      return null
      default:{
        return state
      }
  }
}