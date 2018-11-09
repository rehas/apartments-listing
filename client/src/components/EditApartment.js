import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {getCurrentUser, logout} from '../actions/users'
import {getApartmentId} from '../actions/apartments'

class EditApartment extends PureComponent{

  constructor (props) {
    super(props)
    if(!this.props.currentUser ){
      this.props.logout()
      this.props.history.push('/')
    }
    if (!this.props.currentUserDetails) {
      this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
    }
  }
  
  componentDidMount = () =>{
    this.props.currentUser &&
    this.props.getApartmentId(this.props.match.params.id, this.props.currentUser.jwt)
  }


  render(){
    if (this.props.currentUserDetails && this.props.currentUserDetails.userType === 'client' ){
      this.props.logout()
      this.props.history.push('/')
    }
    return (
      <div>
        This is editing / deleting apartment number {this.props.match.params.id}
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    currentUser: state.currentUser,
    currentUserDetails: state.currentUserDetails,
    apartmentDetails: state.apartmentDetails
  }
}



export default connect(mapStateToProps, {getCurrentUser, logout, getApartmentId})( EditApartment)