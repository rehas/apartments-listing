import * as request from 'superagent'
import {baseUrl} from '../constants'
// import {isExpired, userId } from '../jwt'


export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

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

const userSignUpSuccess = () => ({
  type: USER_SIGNUP_SUCCESS,
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

export const signup = (newUserData) => (dispatch) => {
  request
    .post(`${baseUrl}/users/signup`)
    .send(newUserData)
    .then(response => {
      dispatch(userSignUpSuccess())
      return Promise.resolve( response.body)
    })
    .then(data=>{
      console.log(data)
      dispatch(login(data.email, newUserData.password))
    })
    .catch(err => {
      console.log(err)
      dispatch(logout())
    })
}


