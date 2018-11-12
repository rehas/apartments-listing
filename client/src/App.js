import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout, getCurrentUser} from './actions/users'
import {userId, isExpired} from './jwt'
import './App.css';
import {Route, withRouter } from 'react-router-dom'
import LoginSignUp from './components/LoginSignUp';
import { Button, withStyles, Typography } from '@material-ui/core';
import { compose } from 'redux';
import LockTwoTone from '@material-ui/icons/LockTwoTone'
import MainPage from './components/MainPage';
import EditApartment from './components/crudApartment/EditApartment';
import CreateApartment from './components/crudApartment/CreateApartment';
import EditUser from './components/crudUser/EditUser';
import CreateUser from './components/crudUser/CreateUser';
import UsersList from './components/crudUser/UsersList';
import { Col, Row } from 'react-flexbox-grid';

const styles = theme =>({
  button:{
  margin: theme.spacing.unit,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText
  },
  header:{
    color: theme.palette.primary.contrastText
  },
  headerText:{
    color: theme.palette.primary.contrastText,
  }
})

class App extends Component {

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

  render() {
    const {classes, currentUser, currentUserDetails: cud} = this.props

    if(!currentUser || isExpired(currentUser.jwt)){
      this.props.logout()
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <Row lg={12}>
            <Col lg={1}>
            { currentUser && cud && this.shouldNewPartmentButtonShowUp() &&
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleNewApartment} >
                    New Apartment
              </Button>
              </Row>
            }{ currentUser && cud && this.shouldNewUserButtonShowUp() && 
              <Row lg={1}>
              <Button className={classes.button} onClick={this.handleNewUser}>
                  New User
              </Button>
              </Row>
            }{
              currentUser && cud && this.shouldNewPartmentButtonShowUp() &&
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
                this.props.currentUser &&
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
                    {this.props.currentUserDetails &&
                    <Typography className={classes.headerText}> 
                      {this.props.currentUserDetails.fullName}
                    </Typography>
                    }
                  </Row>
                </Col>
              }
          </Row>
        </header>
        <main id="main">
          <Route exact path='/loginsignup' component={LoginSignUp}/>
          <Route exact path='/' component={LoginSignUp}/>
          <Route exact path='/apartments' component={MainPage}/>
          <Route exact path='/newapartment' component={CreateApartment}/>
          <Route exact path='/newuser' component={CreateUser}/>
          <Route exact path='/users/:id' component={EditUser}/>
          <Route exact path='/users' component={UsersList}/>
          <Route exact path='/apartments/:id' component={EditApartment}/>
        </main>
      </div>
    );
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
) (App)
