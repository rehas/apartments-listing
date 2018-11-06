import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {Input, Button, CssBaseline, withStyles, Paper, Avatar, Typography, FormControl} from '@material-ui/core/';
import SignUpForm from './SignUpForm';
import {login, logout} from '../actions/users'
import LockIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import LoginSignUpFormStyles from '../styles/LoginSignUpFormStyles'

const styles = LoginSignUpFormStyles

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
      .then(x=>{
          if(this.props.currentUser !== null){
            this.props.history.push('/logged')
          }
      })
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout();
  }

  componentDidMount = () =>{
    if(this.props.currentUser !== null){
      this.props.history.push('/logged')
    }
  }
  
  render(){
    const {classes} = this.props
    if(this.props.currentUser !== null){
      this.props.history.push('/logged')
      return (<div></div>)
    }else{
      return (
        <React.Fragment>
          <div>
            {this.state.signup && 
            <span>      
              <SignUpForm/>
              {!this.props.currentUserDetails &&
              <CssBaseline>
                <main className={classes.layout}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    className={classes.cancel}
                    onClick={(e) => this.setState({signup: !this.state.signup})}>Cancel</Button>
                </main>
              </CssBaseline>
              }
              </span>
            }
        </div>
          <CssBaseline />
          {!this.state.signup && 
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                  </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign in
                  </Button>
                  <Button 
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => this.setState({signup: !this.state.signup})}
                  >
                    Don't have an account? - Sign UP
                  </Button>
                </form>
              </Paper>
            </main>
          }
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser : state.currentUser
  }
}

export default connect(mapStateToProps, {login, logout})(withStyles(styles)(LoginSignUp))