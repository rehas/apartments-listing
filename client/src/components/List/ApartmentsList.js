import React, {PureComponent} from 'react'
import ListItem from './ListItem';
import { connect } from 'react-redux';
import {getApartmentsList} from '../../actions/apartments'
import {getCurrentUser} from '../../actions/users'

class ApartmentsList extends PureComponent{

  componentDidMount(){
    this.props.getApartmentsList(null, this.props.currentUser.jwt)
    this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
  }

  render(){
    const list = this.props.listedApartments
    const currentUserDetails = this.props.currentUserDetails
    console.log(list)
    return (
      <div>
        List
        {list && currentUserDetails && 
        list.map(item=>{
          return (
            <ListItem data={item} canEdit={this.props.currentUserDetails.userType!=='client'}/>
          )
        })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser : state.currentUser,
    listedApartments : state.apartmentsList,
    currentUserDetails : state.currentUserDetails
  }
}

export default connect(mapStateToProps,  {getApartmentsList, getCurrentUser})( ApartmentsList)