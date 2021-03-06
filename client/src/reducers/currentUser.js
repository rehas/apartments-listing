import {USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_FAILED} from '../actions/users'
import {localStorageJwtKey} from '../constants'
import { userId } from '../jwt';

let initialState = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    initialState = { jwt: jwt , 
    id: userId(jwt) }
  }
}
catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case USER_LOGIN_SUCCESS:
      return {...payload,
              id: userId(payload.jwt)
            }

    case USER_LOGOUT:
      return null

    case USER_LOGIN_FAILED:
      return null
    

		default:
      return state
	}
}
