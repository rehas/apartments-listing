import * as request from 'superagent'
import {baseUrl} from '../constants'
// import {isExpired, userId } from '../jwt'


export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = () =>({
  type: USER_LOGIN_FAILED,
})

const userLogout = () => ({
  type: USER_LOGOUT,
})

export const login = (email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/users/login`)
    .send({email, password})
    .then(response => {
      console.log(response)
      dispatch(userLoginSuccess(response.body))
      }
    )
    .catch(err=> {
      dispatch(userLoginFailed())
    })
}

export const logout = () => (dispatch) => {
  dispatch(userLogout())
}


