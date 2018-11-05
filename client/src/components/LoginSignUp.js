import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {Input, Button} from '@material-ui/core/';
import SignUpForm from './SignUpForm';

class LoginSignUp extends PureComponent  {

  state = {
    signup : false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
        
        // onClick={this.handleSubmit}
      > Login</Button>
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

export default connect()(LoginSignUp)