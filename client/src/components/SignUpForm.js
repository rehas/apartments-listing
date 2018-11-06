import React,{PureComponent} from 'react';
import {Input, Button, NativeSelect, CssBaseline, withStyles, Paper, Avatar, Typography, FormControl} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import {connect} from 'react-redux'
import {signup} from '../actions/users'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignUpForm extends PureComponent{

  
  state={
    userType:"client",
    isAdmin: ''
  }

  handleChange = (e) =>{
    if(e.target.name ==="userType" && e.target.value !== "admin"){
      this.setState({
        isAdmin: ""
      })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  // handleAdminKey = (e) => {
  //   if(e.target.value !== "admin"){
  //     this.setState({
  //       isAdmin: ""
  //     })
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, fullName, userType, isAdmin} = this.state
    if (!(email && password && fullName)) return
    // Admin key must be present & correct
    // This check can be made in the backend to prevent exposing the key
    // For the sake of simplicity only check is in frontEnd for now.
    if(isAdmin && isAdmin.length > 0 && isAdmin !== 'isAdmin')  return // Make a pop-up for feedback
    
    const newUserData = {
      email, 
      password, 
      fullName, 
      userType
    }
    this.props.signup(newUserData)
  }

  render(){
    const {classes} = this.props

    return (

      <React.Fragment>

  
<CssBaseline />

<main className={classes.layout}>
  <Paper className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Create New Account
    </Typography>
    <form className={classes.form} onSubmit={this.handleSubmit}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input autoComplete="email" autoFocus  onChange={this.handleChange}
        label="None"
        id="email"
        type="email"
        name="email"
        defaultValue=""
        placeholder="Email Address"
        required={true}/>
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
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
          autoComplete="current-password"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="fullName">Full Name</InputLabel>
        <Input
          onChange={this.handleChange}
          label="Dense"
          type="text"
          id="fullName"
          name="fullName"
          defaultValue=""
          placeholder="Full Name"
          margin="dense"
          required={true}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
      <NativeSelect
        defaultValue={"client"}
        input={<Input name="userType" id="user-type" />}
        onChange={this.handleChange}
      >
        <option value={"client"}>Client</option>
        <option value={"realtor"}>Realtor</option>
        <option value={"admin"}>Admin</option>
      </NativeSelect>
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="isAdmin">Admin Key</InputLabel>
        <Input
          onChange={this.handleChange}
          label="Dense"
          type="text"
          id="isAdmin"
          name="isAdmin"
          // defaultValue={this.state.isAdmin}
          disabled={this.state.userType!=="admin"}
          value={this.state.isAdmin}
          placeholder="Admin Key"
          margin="dense"
          required={true}
        />
      </FormControl>
      
      <Button 
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        type="submit">
        CREATE USER
      </Button>
    </form>
  </Paper>
</main>



      <div  >
      {!this.props.currentUserDetails &&
      <form onSubmit={this.handleSubmit}>
      {/* <Input
      onChange={this.handleChange}
      label="None"
      id="fullName"
      type="text"
      name="fullName"
      defaultValue=""
      placeholder="Full Name"
      required ={true}
      /> */}
      {/* <Input
        onChange={this.handleChange}
        label="None"
        id="email"
        type="email"
        name="email"
        defaultValue=""

        placeholder="Email Address"
        required={true}
      /> */}
      {/* <Input
        onChange={this.handleChange}
        label="Dense"
        type="password"
        id="password"
        name="password"
        defaultValue=""

        placeholder="Password"
        margin="dense"
        required={true}
      /> */}
      {/* <NativeSelect
        defaultValue={"client"}
        input={<Input name="userType" id="user-type" />}
        onChange={this.handleChange}
      >
        <option value={"client"}>Client</option>
        <option value={"realtor"}>Realtor</option>
        <option value={"admin"}>Admin</option>
      </NativeSelect> */}
      {/* <Input
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
      /> */}
      {/* <Button type="submit"> Create User</Button> */}
      </form>
      }
    </div>
    
</React.Fragment>
    
    )
  }
}

export default connect(null, {signup})(withStyles(styles)(SignUpForm))