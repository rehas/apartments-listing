import { USER_LOGOUT, USER_LOGIN_FAILED, GET_ALL_USERS_SUCCESS} from '../actions/users'

let initialState = null

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case GET_ALL_USERS_SUCCESS:
      return payload

    case USER_LOGOUT:
      return null

    case USER_LOGIN_FAILED:
      return null
    
		default:
      return state
	}
}
