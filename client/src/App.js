import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout, getCurrentUser} from './actions/users'
import {userId, isExpired} from './jwt'
import './App.css';
import {Route, withRouter } from 'react-router-dom'
import LoginSignUp from './components/LoginSignUp';
import { compose } from 'redux';
import MainPage from './components/MainPage';
import EditApartment from './components/crudApartment/EditApartment';
import CreateApartment from './components/crudApartment/CreateApartment';
import EditUser from './components/crudUser/EditUser';
import CreateUser from './components/crudUser/CreateUser';
import UsersList from './components/crudUser/UsersList';
import Header from './components/Header';


class App extends Component {

  componentDidMount = () => {
    if(!this.props.currentUser || isExpired(this.props.currentUser.jwt)){
      this.props.logout()
    }
  }
  
  render() {
    const {currentUser} = this.props

    // if(!currentUser || isExpired(currentUser.jwt)){
    //   this.props.logout()
    // }
    
    return (
      <div className="App">
        <Header />
        
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
  withRouter,
  connect(mapStateToProps, {logout, userId, getCurrentUser})
) (App)
