import {GET_APARTMENT_ID} from '../actions/apartments'
import { USER_LOGIN_FAILED, USER_LOGOUT } from '../actions/users';
// import { USER_LOGIN_FAILED, USER_LOGOUT } from '../actions/users';

let initialState = null

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_APARTMENT_ID:
      return payload
    case USER_LOGIN_FAILED:
      return null
    case USER_LOGOUT:
      return null      
    default:
      return state
  }
}