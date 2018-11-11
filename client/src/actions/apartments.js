import * as request from 'superagent'
import {baseUrl} from '../constants'
import { isExpired } from '../jwt';
import { logout } from './users';

export const GET_APARTMENTS_LIST = 'GET_APARTMENTS_LIST'
export const GET_APARTMENT_ID = 'GET_APARTMENT_ID'

const getApartmentsListSuccess = (apartmentsList) =>({
  type: GET_APARTMENTS_LIST,
  payload: apartmentsList
})

const getApartmentIdSuccess = (apartment) =>({
  type: GET_APARTMENT_ID,
  payload: apartment
})

export const getApartmentsList = (filterData, jwt) => (dispatch) =>{
  if (isExpired(jwt)){
    dispatch(logout());
  }
  let {size, price, rooms, skip} = filterData

  let sizeMin, priceMin, norMin, sizeMax, priceMax, norMax;

  if (size){
    sizeMin = [0, 51, 101, 151][size]
    sizeMax = [50, 100, 150, null][size]
  }

  if (price){
    priceMin = [0, 501, 1001, 1501][price]
    priceMax = [500, 1000, 1500, null][price]
  }

  if (rooms){
    norMin = [0, 2, 4][rooms]
    norMax = [1, 3, null][rooms]
  }

  const query = {
    skip, 
    sizeMin,
    sizeMax,
    priceMin,
    priceMax,
    norMin,
    norMax
  }

  // console.log(query)
  // console.log(filterData)

  request
    .get(`${baseUrl}/apartments`)
    .set('Authorization', `Bearer ${jwt}`)
    .query(query)
    .then(response => {
      // console.log(response.body)
      dispatch(getApartmentsListSuccess(response.body))
    })
    .catch(err => console.log(err))
}
export const getApartmentId = (apartmentId, jwt) => (dispatch) =>{

  if (isExpired(jwt)){
    dispatch(logout());
  }
  
  request
    .get(`${baseUrl}/apartments/${apartmentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      // console.log(response.body)
      dispatch(getApartmentIdSuccess(response.body));
    })
    .catch(err => console.log(err))

  }

export const editApartment = (apartmentId, jwt, apartmentData) => (dispatch) =>{
  if (isExpired(jwt)){
    dispatch(logout());
  }
  
  request
    .patch(`${baseUrl}/apartments/${apartmentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(apartmentData)
    .then(response=>{
      console.log(response)
      dispatch(getApartmentsList({}, jwt));
      dispatch(getApartmentId(apartmentId, jwt))
    })
    .catch(err=> console.log(err))
}

export const deleteApartment = (apartmentId, jwt) => (dispatch) =>{
  if (isExpired(jwt)){
    dispatch(logout());
  }
  
  request
    .delete(`${baseUrl}/apartments/${apartmentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => console.log(response))
    .catch(err=> console.log(err))
}

export const createApartment = (jwt, apartmentData) => (dispatch, getState) => {
  if (isExpired(jwt)){
    dispatch(logout());
  }

  request
    .post(`${baseUrl}/apartments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(apartmentData)
    .then(response=>{
      console.log(response)
      dispatch(getApartmentsList({}, jwt));
    })
    .catch(err=> console.log(err))
}

