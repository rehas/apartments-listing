import React, {PureComponent} from 'react'
import { Col, Row } from 'react-flexbox-grid';
import { Button, withStyles, Typography } from '@material-ui/core';
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {userId, isExpired} from '../jwt'
import { compose } from 'redux';
import {logout, getCurrentUser} from '../actions/users'
import LockTwoTone from '@material-ui/icons/LockTwoTone'
import HeaderStyles from '../styles/HeaderStyles';

const styles = HeaderStyles

class Header extends PureComponent{
  constructor (props) {
    super(props)
    if(!this.props.currentUser ){
      this.props.logout()
      this.props.history.push('/')
    }else if (!this.props.currentUserDetails) {
      this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout();
    this.props.history.push('/loginsignup')
  }

  handleNewApartment = (e) =>{
    e.preventDefault()
    this.props.history.push('/newapartment')
  }

  handleNewUser = (e) =>{
    e.preventDefault()
    this.props.history.push('/newuser')
  }

  handleUserList = (e) =>{
    e.preventDefault()
    this.props.history.push('/users')
  }

  shouldNewPartmentButtonShowUp = () => {
    const isAdminOrRealtor = (this.props.currentUserDetails.userType !== 'client' )
    const isOnMainPage = this.props.location.pathname.includes('/apartments')

    return isAdminOrRealtor && isOnMainPage
  }

  shouldNewUserButtonShowUp = () =>{
    const isAdmin = this.props.currentUserDetails.userType === 'admin'
    const isOnUsersPage = this.props.location.pathname.includes('/users')

    return isAdmin && isOnUsersPage
  }
  render(){
    const {classes, currentUser : cu, currentUserDetails: cud} = this.props

    if(!cu || isExpired(cu.jwt)){
      this.props.logout()
    }
    return (
      <header className={classes.root}>
          <Row lg={12}>
            <Col lg={1}>
            { cu && cud && this.shouldNewPartmentButtonShowUp() &&
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleNewApartment} >
                    New Apartment
              </Button>
              </Row>
            }{ cu && cud && this.shouldNewUserButtonShowUp() && 
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleNewUser}>
                  New User
              </Button>
              </Row>
            }{
              cu && cud && this.shouldNewPartmentButtonShowUp() &&
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleUserList}>
                  User List
              </Button>
              </Row>
            }
            </Col>
            <Col  lg={9}>
              {/* <h1 className="App-title"> */}
                <Typography variant='headline' className={classes.header}>
                  Apartments Listing App
                </Typography>
              {/* </h1> */}
            </Col>
              {
                cu &&
                <Col  lg={2}>
                  <Row lg={2}>
                  <Button
                    className={classes.button}
                    type="submit"
                    onClick={this.handleLogout}
                    >Logout <LockTwoTone/>
                    </Button>
                  </Row>  
                  <Row lg={2}>
                    {cud &&
                    <Typography className={classes.headerText}> 
                      {cud.fullName}
                    </Typography>
                    }
                  </Row>
                </Col>
              }
          </Row>
        </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser : state.currentUser,
    currentUserDetails : state.currentUserDetails,
  }
}
export default  compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {logout, userId, getCurrentUser})
) (Header)