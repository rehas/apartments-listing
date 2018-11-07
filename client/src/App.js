import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from './actions/users'
import {userId} from './jwt'
import './App.css';
import {Route, withRouter } from 'react-router-dom'
import LoginSignUp from './components/LoginSignUp';
import { Button, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import Apartments from './components/Apartments';

const styles = theme =>({
  button:{
  margin: theme.spacing.unit,
  backgroundColor: theme.palette.secondary.main,
  }
})

class App extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout();
    this.props.history.push('/loginsignup')
  }
  render() {
    const {classes} = this.props
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Apartments Listing App</h1>
          {
            this.props.currentUser && <span>
            <Button
            className={classes.button}
            type="submit"
            onClick={this.handleLogout}
          > Logout UserId: {this.props.currentUser.id}</Button></span>
          }
          <span>
            {this.props.currentUserDetails && this.props.currentUserDetails.fullName}
          </span>
        </header>
        <main id="main">
          <Route exact path='/loginsignup' component={LoginSignUp}/>
          <Route exact path='/apartments' component={Apartments}/>
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
  connect(mapStateToProps, {logout, userId})
) (App)
