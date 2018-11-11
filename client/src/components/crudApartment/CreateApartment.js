import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {getCurrentUser, logout} from '../../actions/users'
import {getApartmentId, editApartment, deleteApartment, createApartment} from '../../actions/apartments'
import LoginSignUpFormStyles from '../../styles/LoginSignUpFormStyles';
import EditIcon from '@material-ui/icons/Edit';
import { CssBaseline, Paper, Avatar, Typography, FormControl, InputLabel, Input, withStyles, NativeSelect, Button } from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid/lib';

const styles = LoginSignUpFormStyles


class CreateApartment extends PureComponent{

  state = {
    data : {
      available:true
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
  
  componentDidMount = () =>{
  }

  handleChange = (e) => {
    this.setState({
      data:{ ...this.state.data,
        [e.target.name] : e.target.value
      }
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.createApartment(this.props.currentUser.jwt, this.state.data)
    this.props.history.push('/apartments')
  }

  handleCancel = (e) =>{
    this.props.history.push('/apartments')
  }


  render(){

    const { currentUser: cu, currentUserDetails : cud} = this.props

    const ad = this.state.data

    if (cud && cud.userType === 'client' ){
      this.props.logout()
      this.props.history.push('/')
    }
    const {classes} = this.props

    console.log(this.props)

    return (
        <React.Fragment>
        <CssBaseline />
        {
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              {/* <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar> */}
              <Typography component="h1" variant="h5">
                Create Apartment 
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input autoFocus  onChange={this.handleChange}
                  label="None"
                  id="name"
                  type="name"
                  name="name"
                  defaultValue={ad ?ad.name : ""}
                  placeholder="Apartment Name"
                  required={true}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="description"
                    id="description"
                    name="description"
                    defaultValue={ad ?ad.description : ""}
                    placeholder="description"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="floorAreaSize">Floor Area Size m<sup>2</sup></InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="floorAreaSize"
                    name="floorAreaSize"
                    defaultValue={ad ?ad.floorAreaSize : ""}
                    placeholder="Floor Area Size"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required>
                  <InputLabel htmlFor="numberOfRooms">Number Of Rooms</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="numberOfRooms"
                    name="numberOfRooms"
                    defaultValue={ad ?ad.numberOfRooms : ""}
                    placeholder="Number Of Rooms"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required>
                  <InputLabel htmlFor="pricePerMonth">Price Per Month</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="pricePerMonth"
                    name="pricePerMonth"
                    defaultValue={ad ?ad.pricePerMonth : ""}
                    placeholder="Price Per Month"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required >
                  <InputLabel htmlFor="lat">Latitude</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="lat"
                    name="lat"
                    defaultValue={ad ?ad.lat : ""}
                    placeholder="Latitude"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required >
                  <InputLabel htmlFor="lon">Longitude</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="lon"
                    name="lon"
                    defaultValue={ad ?ad.lon : ""}
                    placeholder="Longitude"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <NativeSelect
                  defaultValue={ad ?ad.available : true}
                  input={<Input name="available" id="available" />}
                  onChange={this.handleChange}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Inavailable</option>
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
                      CREATE
                    </Button>
                  </Col>
                </Row>
                <Button 
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.handleCancel}>
                  {!this.state.editComplete ? 'CANCEL' : 'BACK TO APARTMENTS'}
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
    apartmentDetails: state.currentApartment
  }
}

const mapDispatchToProps = {
  getCurrentUser, logout, getApartmentId, editApartment, deleteApartment, createApartment
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles) (CreateApartment))