import {GET_APARTMENT_ID, CANCEL_EDIT_APARTMENT} from '../actions/apartments'
import { USER_LOGIN_FAILED, USER_LOGOUT } from '../actions/users';

let initialState = null

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_APARTMENT_ID:
      return payload
    case USER_LOGIN_FAILED:
      return null
    case CANCEL_EDIT_APARTMENT:
      return null
    case USER_LOGOUT:
      return null      
    default:
      return state
  }
}