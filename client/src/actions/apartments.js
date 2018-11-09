import * as request from 'superagent'
import {baseUrl} from '../constants'
import { isExpired } from '../jwt';
import { logout } from './users';

export const GET_APARTMENTS_LIST = 'GET_APARTMENTS_LIST'

const getApartmentsListSuccess = (apartmentsList) =>({
  type: GET_APARTMENTS_LIST,
  payload: apartmentsList
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