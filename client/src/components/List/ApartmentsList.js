import React, {PureComponent} from 'react'
import ListItem from './ListItem';

class ApartmentsList extends PureComponent{

  render(){
    return (
      <div>
        List
        <ListItem data="Passed Data"/>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser : state.currentUser,
    listedApartments : state.listedApartments
  }
}

export default ApartmentsList