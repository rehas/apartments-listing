import * as request from 'superagent'
import {baseUrl} from '../constants'
import {userId, isExpired } from '../jwt'


export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const GET_EDIT_USER = 'GET_EDIT_USER'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const getAllUsersSuccess = (data) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload : data
})

const userLoginFailed = () =>({
  type: USER_LOGIN_FAILED
})

const userLogout = () => ({
  type: USER_LOGOUT
})

const userSignUpSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const getCurrentUserSuccess = (userData) => ({
  type: GET_CURRENT_USER,
  payload: userData
})

const getUserForEditingSuccess = (userData) => ({
  type: GET_EDIT_USER,
  payload : userData
})

export const login = (email, password) => (dispatch) => {
  return Promise.resolve (request
    .post(`${baseUrl}/users/login`)
    .send({email, password})
    .then(response => {
      // console.log(response)
      dispatch(userLoginSuccess(response.body))
      dispatch(getCurrentUser(userId(response.body.jwt), response.body.jwt))
      }
    )
    .catch(err=> {
      dispatch(userLoginFailed())
    })
  )
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
      // console.log(data)
      dispatch(login(data.email, newUserData.password))
    })
    .catch(err => {
      console.log(err)
      dispatch(logout())
    })
}

export const getCurrentUser = (userid, jwt)=> (dispatch) =>{
  request
    .get(`${baseUrl}/users/${userid}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => 
      {
        // console.log(response.body);
        dispatch(getCurrentUserSuccess(response.body))
      })
    .catch(err=> console.log(err))
}

export const getUserForEditing = (edituserid, jwt)=> (dispatch) =>{
  if (isExpired(jwt)){
    dispatch(logout());
  }

  const adminId = userId(jwt)

  request
    .get(`${baseUrl}/users/${adminId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => 
      {
        // console.log(response.body);
        dispatch(getCurrentUserSuccess(response.body))
        if(response.body.userType !=='admin'){
          dispatch(logout())
        }else{
          console.log("second step of editing")
          request
          .get(`${baseUrl}/users/edit/${edituserid}`)
          .set('Authorization', `Bearer ${jwt}`)
          .then(response => 
            {
              // console.log(response.body);
              dispatch(getUserForEditingSuccess(response.body))
            })
          .catch(err=> console.log(err))
        }
      })
    .catch(err=> console.log(err))
}

export const editUser = (edituserid, jwt, editUserData) => (dispatch) => {
  if (isExpired(jwt)){
    dispatch(logout())
  }

  request
    .patch(`${baseUrl}/users/${edituserid}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(editUserData)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>console.log(err))
}

export const deleteUser = (deleteUserId, jwt) => (dispatch) => {
  if (isExpired(jwt)){
    dispatch(logout())
  }

  request
    .delete(`${baseUrl}/users/${deleteUserId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => console.log(response))
    .catch(err=> console.log(err))
}

export const createUser = (jwt, newUserData) => (dispatch) => {
  if(isExpired(jwt)){
    dispatch(logout())
  }

  request
    .post(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(newUserData)
    .then(response=> console.log(response))
    .catch(err=> console.log(err))
}

export const getAllUsers = (jwt) => (dispatch) => {
  if(isExpired(jwt)){
    dispatch(logout())
  }

  request
    .get(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response=> {
      console.log(response)
      dispatch(getAllUsersSuccess(response.body))
    })
    .catch(err=> console.log(err))
}