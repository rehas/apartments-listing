import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {Input, Button, CssBaseline, withStyles, Paper, Avatar, Typography, FormControl} from '@material-ui/core/';
import SignUpForm from './SignUpForm';
import {login, logout} from '../actions/users'
import LockIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';

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
  cancel: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    marginTop: theme.spacing.unit * 3,

  }
});

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
    const {classes} = this.props

  return (
<React.Fragment>

    <div>
      {/* <form onSubmit={this.handleSubmit}>
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
      </form> */}
      {/* <Button onClick={(e) => this.setState({signup: !this.state.signup})}>Sign UP</Button> */}

      <div>
      {this.state.signup && 
      <span>      
      <SignUpForm/>
      {!this.props.currentUserDetails &&
      <CssBaseline>
        <main className={classes.layout}>
        <Button
        type="submit"
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
        onClick={(e) => this.setState({signup: !this.state.signup})}>
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

const mapStateToProps = state => {
  return {
    currentUser : state.currentUser
  }
}


export default connect(mapStateToProps, {login, logout})(withStyles(styles)(LoginSignUp))