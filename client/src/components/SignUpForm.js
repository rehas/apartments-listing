import React,{PureComponent} from 'react';
import {Input, Button, NativeSelect} from '@material-ui/core/';
import {connect} from 'react-redux'
class SignUpForm extends PureComponent{

  state={
    userType:"client"
  }

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, fullName, userType} = this.state
    if (!(email && password && fullName)) return
    this.props.signup(email, password, fullName, userType )
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
        type="text"
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
        type="password"
        id="admin-password"
        name="isAdmin"
        defaultValue=""
        style={{display:this.state.userType==="admin" ? "inline-flex" : "none"}}
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

export default connect()(SignUpForm)