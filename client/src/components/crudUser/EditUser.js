import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getCurrentUser, logout, getUserForEditing, editUser, deleteUser} from '../../actions/users'
import {Input, Button, NativeSelect, CssBaseline, withStyles, Paper, Avatar, Typography, FormControl} from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import { Row, Col } from 'react-flexbox-grid/lib';
import LoginSignUpFormStyles from '../../styles/LoginSignUpFormStyles';

const styles = LoginSignUpFormStyles


class EditUser extends PureComponent{
  state = {
    editComplete : false,
    data : {}
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

  componentDidMount = () => {
    this.props.currentUser && 
    this.props.getUserForEditing(this.props.match.params.id, this.props.currentUser.jwt)
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
    this.props.editUser(this.props.match.params.id, this.props.currentUser.jwt, this.state.data)
    this.setState({
      editComplete : !this.state.editComplete
    })
  }

  handleDelete = (e) => {
    this.props.deleteUser(this.props.match.params.id, this.props.currentUser.jwt)
    // push to userList
    this.props.history.push('/users')
  }

  render(){
    const { currentUser: cu, currentUserDetails : cud, editUserInfo : eu} = this.props

    if (cud && cud.userType !== 'admin' ){
      this.props.logout()
      this.props.history.push('/')
    }
    const {classes} = this.props

    console.log(eu)

    return (
      <React.Fragment>
      {!eu && 
        <div>User Not Found</div>
      }
      <CssBaseline />
      {eu &&
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <EditIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Edit or Delete User : <br/> {eu.fullName}
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <Input autoFocus  onChange={this.handleChange}
                label="None"
                id="fullName"
                type="name"
                name="fullName"
                defaultValue={eu ?eu.fullName : ""}
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
                  defaultValue={eu ?eu.email : ""}
                  placeholder="Email Address"
                  margin="dense"
                  required={true}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input
                  onChange={this.handleChange}
                  label="Dense"
                  type="text"
                  id="password"
                  name="password"
                  defaultValue={eu ?eu.password : ""}
                  placeholder="Password"
                  margin="dense"
                />
              </FormControl>
              
              <FormControl margin="normal" required fullWidth>
                  <NativeSelect
                  defaultValue={eu ? eu.userType : 'client'}
                  input={<Input name="userType" id="user-type" />}
                  onChange={this.handleChange}
                >
                  <option value={"client"}>Client</option>
                  <option value={"realtor"}>Realtor</option>
                  <option value={"admin"}>Admin</option>
                </NativeSelect>
              </FormControl>
              <Row lg={12}>
                <Col lg={6}>
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
                <Col lg={6}>
                  <Button 
                    fullWidth
                    variant="contained"
                    className={classes.delete}
                    // disabled={this.state.editComplete}
                    onClick={this.handleDelete}>
                    DELETE
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
  getCurrentUser, logout, getUserForEditing, editUser, deleteUser
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles) (EditUser))