import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {Input, Button} from '@material-ui/core/';
import SignUpForm from './SignUpForm';
import {login, logout} from '../actions/users'

class LoginSignUp extends PureComponent  {

  state = {
    signup : false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    this.props.login( email, password )
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout();
  }
  
  render(){
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
      <Input
        onChange={this.handleChange}
        label="None"
        id="email"
        type="email"
        name="email"
        defaultValue=""
        placeholder="Email Address"
        required={true}
      />
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="password"
        id="password"
        name="password"
        defaultValue=""
        placeholder="PassWord"
        margin="dense"
        required={true}
      />
      <Button
        type="submit"
        
        onClick={this.handleSubmit}
      > Login</Button>
      <Button
        type="submit"
        
        onClick={this.handleLogout}
      > Logout</Button>
      </form>
      <Button onClick={(e) => this.setState({signup: !this.state.signup})}>Sign UP</Button>

      <div>
      {this.state.signup && 
      <span>      
      <SignUpForm/>
      {!this.props.currentUserDetails &&
        <Button onClick={(e) => this.setState({signup: !this.state.signup})}>Cancel</Button>
      }
      </span>
      }
      </div>
    
    </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser : state.currentUser
  }
}


export default connect(mapStateToProps, {login, logout})(LoginSignUp)