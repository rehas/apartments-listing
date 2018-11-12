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

  componentDidMount = () =>{
    if(!this.props.currentUser || isExpired(this.props.currentUser.jwt)){
      this.props.logout()
      return <div></div>
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

  handleBack = (e) =>{
    e.preventDefault()
    this.props.history.goBack()
  }

  shouldNewPartmentButtonShowUp = () => {
    const isAdminOrRealtor = (this.props.currentUserDetails.userType !== 'client' )
    const isOnMainPage = this.props.location.pathname.includes('/apartments')

    return isAdminOrRealtor && isOnMainPage
  }
  shouldUserListButtonShowUp = () => {
    const isAdmin = this.props.currentUserDetails.userType === 'admin'
    const isOnMainPage = this.props.location.pathname.includes('/apartments')

    return isAdmin && isOnMainPage
  }

  shouldNewUserButtonShowUp = () =>{
    const isAdmin = this.props.currentUserDetails.userType === 'admin'
    const isOnUsersPage = this.props.location.pathname.includes('/users')

    return isAdmin && isOnUsersPage
  }

  shouldBackButtonShowUp = () => {
    const isNotOnMainPage = this.props.location.pathname.includes("new") || this.props.location.pathname.includes("user")

    return isNotOnMainPage
  }

  render(){
    const {classes, currentUser : cu, currentUserDetails: cud} = this.props

    
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
              cu && cud && this.shouldUserListButtonShowUp() &&
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleUserList}>
                  User List
              </Button>
              </Row>
            }{
              cu && cud && this.shouldBackButtonShowUp()&&
              <Button className={classes.button} onClick={this.handleBack}>
                  Back
              </Button>
            }
            </Col>
            <Col  lg={10}>
                <Typography variant='headline' className={classes.header}>
                  Apartments Listing App
                </Typography>
            </Col>
              {
                cu &&
                <Col  lg={1}>
                  <Row lg={1}>
                  <Button
                    className={classes.button}
                    type="submit"
                    onClick={this.handleLogout}
                    >Logout <LockTwoTone/>
                    </Button>
                  </Row>  
                  <Row lg={1}>
                    {cud &&
                    <Typography className={classes.headerText} variant='button'> 
                      {cud.fullName.slice(0,8)}
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