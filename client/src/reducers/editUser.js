import { USER_LOGOUT, USER_LOGIN_FAILED, GET_EDIT_USER} from '../actions/users'
import {localStorageJwtKey} from '../constants'

let initialState = null


export default function (state = initialState, {type, payload}) {
	switch (type) {
		case GET_EDIT_USER:
      return payload

    case USER_LOGOUT:
      return null

    case USER_LOGIN_FAILED:
      return null
    
		default:
      return state
	}
}
