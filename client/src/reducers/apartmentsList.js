import {GET_APARTMENTS_LIST} from '../actions/apartments'

let initialState = null

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_APARTMENTS_LIST:
      return payload      
    default:
      return state
  }
}