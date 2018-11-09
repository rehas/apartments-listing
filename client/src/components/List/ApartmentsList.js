import React, { PureComponent } from 'react'
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getApartmentsList } from '../../actions/apartments'
import { getCurrentUser, logout } from '../../actions/users'
import { Button, Typography } from '@material-ui/core';
import { Col } from 'react-flexbox-grid';
import Row from 'react-flexbox-grid/lib/components/Row';
import FilterListing from './FilterListing';
import { compose } from 'redux';


class ApartmentsList extends PureComponent{

  state = {
    page : 1,
  }

  componentDidMount(){
    if(!this.props.currentUser){
      this.props.logout()
      this.props.history.push('/loginsignup')
    }else{
      this.props.getApartmentsList({skip: this.state.page - 1}, this.props.currentUser.jwt)
      this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
    }
  }

  handlePage =  (direction) =>{
    if(direction === 'next'){
      const count = this.props.listedApartments && this.props.listedApartments.count
      const maxPage = count %5 === 0 ? count / 5 : Math.floor(count / 5) +1

      if(this.state.page === maxPage){
        return
      }
      this.setState({
        page: this.state.page +1
        }, 
        () => this.props.getApartmentsList(
            {
              ...this.state,
              skip: this.state.page-1
            }, this.props.currentUser.jwt)
          )
    }else{
      if(this.state.page === 1){
        return
      }
      this.setState({
        page: this.state.page -1
      }, 
      () => this.props.getApartmentsList(
          {
            ...this.state,
            skip: this.state.page-1
          }, this.props.currentUser.jwt)
        )
    }
  }

  handleFilter = (selection) =>{
    console.log({
      ...selection
    })
    this.setState({...selection} , ()=>{
      console.log(this.state)
      this.props.getApartmentsList({
        ...this.state,
        skip: this.state.page-1
      }, this.props.currentUser.jwt)
    })
  }

  render(){
    if(!this.props.currentUser){
      this.props.logout()
      this.props.history.push('/loginsignup')
    }
    const list = this.props.listedApartments && this.props.listedApartments.page
    const currentUserDetails = this.props.currentUserDetails
    return (
      <div>
        List
        <Row lg={12}>
          <Col lg={4}><FilterListing filterType={"size"} onSelect={this.handleFilter}/></Col>
          <Col lg={4}><FilterListing filterType={"price"} onSelect={this.handleFilter}/></Col>
          <Col lg={4}><FilterListing filterType={"rooms"} onSelect={this.handleFilter}/></Col>
        </Row>

        {
          list && list.length === 0 &&
          <ListItem noApartments={true}/>
        }
        
        {list && currentUserDetails && 
        list.map(item=>{
          return (
            <ListItem key={item.id} data={item} canEdit={this.props.currentUserDetails.userType!=='client'}/>
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

export default compose(
  withRouter,
  connect(mapStateToProps,  {getApartmentsList, getCurrentUser, logout})
) ( ApartmentsList)