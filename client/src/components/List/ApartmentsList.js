import React, {PureComponent} from 'react'
import ListItem from './ListItem';
import { connect } from 'react-redux';
import {getApartmentsList} from '../../actions/apartments'

class ApartmentsList extends PureComponent{

  componentDidMount(){
    this.props.getApartmentsList(null, this.props.currentUser.jwt)
  }

  render(){
    const list = this.props.listedApartments
    console.log(list)
    return (
      <div>
        List
        {list && 
        list.map(item=>{
          return (
            <ListItem data={item}/>
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
    listedApartments : state.apartmentsList
  }
}

export default connect(mapStateToProps,  {getApartmentsList})( ApartmentsList)