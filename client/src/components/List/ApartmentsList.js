import React, {PureComponent} from 'react'
import ListItem from './ListItem';
import { connect } from 'react-redux';
import {getApartmentsList} from '../../actions/apartments'
import {getCurrentUser} from '../../actions/users'
import { Button, Typography } from '@material-ui/core';
import { Grid, Col } from 'react-flexbox-grid';
import Row from 'react-flexbox-grid/lib/components/Row';

class ApartmentsList extends PureComponent{

  state = {
    page : 1,
  }

  componentDidMount(){
    this.props.getApartmentsList({skip: this.state.page - 1}, this.props.currentUser.jwt)
    this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
  }

  handlePage =  (direction) =>{
    if(direction === 'next'){
      const count = this.props.listedApartments && this.props.listedApartments.count

      const maxPage = count %5 === 0 ? count / 5 : Math.floor(count / 5) +1

      console.log(`count = ${count}`)
      console.log(`maxPage = ${maxPage}`)

      if(this.state.page === maxPage){
        return
      }
      this.setState({
        page: this.state.page +1
      }, () => this.props.getApartmentsList({skip: this.state.page-1}, this.props.currentUser.jwt) )
      // this.props.getApartmentsList({skip: this.state.page-1}, this.props.currentUser.jwt)
    }else{
      if(this.state.page === 1){
        return
      }
      this.setState({
        page: this.state.page -1
      }, () => this.props.getApartmentsList({skip: this.state.page-1}, this.props.currentUser.jwt) )
    }
  }

  render(){
    const list = this.props.listedApartments && this.props.listedApartments.page
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
          <Row lg={12}>
            <Col lg={4}> <Button onClick={ ()=> this.handlePage('prev')}>{"<"}</Button>  </Col>
            <Col lg={4}> <Typography variant="body2">{this.state.page}</Typography> </Col>
            <Col lg={4}> <Button onClick={ ()=> this.handlePage('next')}>{">"}</Button> </Col>
          </Row>
        
        
        
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