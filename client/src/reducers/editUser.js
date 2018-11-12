import { USER_LOGOUT, USER_LOGIN_FAILED, GET_EDIT_USER, GET_ALL_USERS_SUCCESS} from '../actions/users'

let initialState = null

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case GET_EDIT_USER:
      return payload

    case USER_LOGOUT:
      return null

    case USER_LOGIN_FAILED:
      return null
    
    case GET_ALL_USERS_SUCCESS:
      return null
    
		default:
      return state
	}
}
