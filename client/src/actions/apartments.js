import * as request from 'superagent'
import {baseUrl} from '../constants'

export const GET_APARTMENTS_LIST = 'GET_APARTMENTS_LIST'

const getApartmentsListSuccess = (apartmentsList) =>({
  type: GET_APARTMENTS_LIST,
  payload: apartmentsList
})

export const getApartmentsList = (filterData, jwt) => (dispatch) =>{
  request
    .get(`${baseUrl}/apartments`)
    .set('Authorization', `Bearer ${jwt}`)
    .query(filterData)
    .then(response => {
      console.log(response.body)
      dispatch(getApartmentsListSuccess(response.body))
    })
    .catch(err => console.log(err))
}