import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getCurrentUser, logout, getUserForEditing, editUser, deleteUser, createUser} from '../../actions/users'
import {Input, Button, NativeSelect, CssBaseline, withStyles, Paper, Typography, FormControl} from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import { Row, Col } from 'react-flexbox-grid/lib';
import LoginSignUpFormStyles from '../../styles/LoginSignUpFormStyles';

const styles = LoginSignUpFormStyles


class CreateUser extends PureComponent{
  state = {
    data : {
      userType:"client",
    }
  }

  constructor (props) {
    super(props)
    if(!this.props.currentUser ){
      this.props.logout()
      this.props.history.push('/')
    }else if (!this.props.currentUserDetails) {
      this.props.getCurrentUser(this.props.currentUser.id, this.props.currentUser.jwt)
    }
  }

  handleChange = (e) => {
    this.setState({
      data:{
        ...this.state.data,
        [e.target.name] : e.target.value
      }
    })
  }

  handleCancel = (e) =>{
    this.props.history.push('/users')
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createUser( this.props.currentUser.jwt, this.state.data)
    this.setState({
      editComplete : !this.state.editComplete
    })

  }

  render(){
    const { currentUser: cu, currentUserDetails : cud} = this.props
    
    const ud = this.state.data

    if (cu && cud && cud.userType !== 'admin' ){
      this.props.logout()
      this.props.history.push('/')
    }
    const {classes} = this.props

    return (
      <React.Fragment>
      <CssBaseline />
      {cud &&
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create User 
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <Input autoFocus  onChange={this.handleChange}
                label="None"
                id="fullName"
                type="name"
                name="fullName"
                defaultValue={ud? ud.fullName : ""}
                placeholder="User Full Name"
                required={true}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  onChange={this.handleChange}
                  label="Dense"
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={ud ?ud.email : ""}
                  placeholder="Email Address"
                  margin="dense"
                  required={true}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input
                  onChange={this.handleChange}
                  label="Dense"
                  type="text"
                  id="password"
                  name="password"
                  defaultValue={ud ?ud.password : ""}
                  placeholder="Password"
                  margin="dense"
                  required={true}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                  <NativeSelect
                  defaultValue={ud ? ud.userType : 'client'}
                  input={<Input name="userType" id="user-type" />}
                  onChange={this.handleChange}
                >
                  <option value={"client"}>Client</option>
                  <option value={"realtor"}>Realtor</option>
                  <option value={"admin"}>Admin</option>
                </NativeSelect>
              </FormControl>
              <Row lg={12}>
                <Col lg={12}>
                  <Button 
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={this.state.editComplete}
                    type="submit">
                    SAVE
                  </Button>
                </Col>
              </Row>
              <Button 
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.handleCancel}>
                {!this.state.editComplete ? 'CANCEL' : 'BACK TO USERS'}
              </Button>
            </form>
          </Paper>
        </main>
      }      
    </React.Fragment>
      )
  }

}

const mapStateToProps = state =>{
  return {
    currentUser: state.currentUser,
    currentUserDetails: state.currentUserDetails,
    editUserInfo : state.editUser
  }
}

const mapDispatchToProps = {
  getCurrentUser, logout, getUserForEditing, editUser, deleteUser, createUser
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles) (CreateUser))