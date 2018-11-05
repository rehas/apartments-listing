import React,{PureComponent} from 'react';
import {Input, Button, NativeSelect} from '@material-ui/core/';
import {connect} from 'react-redux'
import {signup} from '../actions/users'
class SignUpForm extends PureComponent{

  state={
    userType:"client"
  }

  handleChange = (e) =>{
    console.log(e.target.value)
    if(e.target.name ==="userType" && e.target.value !== "admin"){
      this.setState({
        isAdmin: ""
      })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAdminKey = (e) => {
    console.log(e.target.value)
    if(e.target.value !== "admin"){
      this.setState({
        isAdmin: ""
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, fullName, userType, isAdmin} = this.state
    if (!(email && password && fullName)) return
    // Admin key must be present & correct
    // This check can be made in the backend to prevent exposing the key
    // For the sake of simplicity only check is in frontEnd for now.
    if(isAdmin.length > 0 && isAdmin !== 'isAdmin')  return // Make a pop-up for feedback
    
    const newUserData = {
      email, 
      password, 
      fullName, 
      userType
    }
    this.props.signup(newUserData)
  }

  render(){
    return (
      <div  >
      {!this.props.currentUserDetails &&
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="fullName"
      type="text"
      name="fullName"
      defaultValue=""
      placeholder="Full Name"
      required ={true}
      />
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

        placeholder="Password"
        margin="dense"
        required={true}
      />
      <NativeSelect
        defaultValue={"client"}
        input={<Input name="userType" id="user-type" />}
        onChange={this.handleChange}
      >
        <option value={"client"}>Client</option>
        <option value={"realtor"}>Realtor</option>
        <option value={"admin"}>Admin</option>
      </NativeSelect>
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="text"
        id="admin-password"
        name="isAdmin"
        defaultValue={this.state.isAdmin}
        style={{display:this.state.userType==="admin" ? "inline-flex" : "none"}}
        value={this.state.isAdmin}
        placeholder="Admin Key"
        margin="dense"
      />
      <Button type="submit"> Create User</Button>
      </form>
      }
    </div>
    )
  }
}

export default connect(null, {signup})(SignUpForm)