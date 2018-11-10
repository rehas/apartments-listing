import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {getCurrentUser, logout} from '../actions/users'
import {getApartmentId, editApartment} from '../actions/apartments'
import LoginSignUpFormStyles from '../styles/LoginSignUpFormStyles';
import EditIcon from '@material-ui/icons/Edit';
import { CssBaseline, Paper, Avatar, Typography, FormControl, InputLabel, Input, withStyles, NativeSelect, Button } from '@material-ui/core';

const styles = LoginSignUpFormStyles


class EditApartment extends PureComponent{

  state = {

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
    this.props.currentUser &&
    this.props.getApartmentId(this.props.match.params.id, this.props.currentUser.jwt)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.editApartment(this.props.match.params.id, this.props.currentUser.jwt, this.state)
  }

  render(){

    const { currentUser: cu, currentUserDetails : cud, apartmentDetails : ad} = this.props

    if (cud && cud.userType === 'client' ){
      this.props.logout()
      this.props.history.push('/')
    }
    const {classes} = this.props

    console.log(this.props)

    if(!ad){
    this.props.getApartmentId(this.props.match.params.id, this.props.currentUser.jwt)
    }

    return (
        <React.Fragment>
        {!ad && 
          <div>Apartment Not Found</div>
        }
        <CssBaseline />
        {ad &&
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit or Delete Apartment : <br/> {ad.name}
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input autoFocus  onChange={this.handleChange}
                  label="None"
                  id="name"
                  type="name"
                  name="name"
                  defaultValue={ad.name}
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
                    defaultValue={ad.description}
                    placeholder="description"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="floorAreaSize">Floor Area Size</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="floorAreaSize"
                    name="floorAreaSize"
                    defaultValue={ad.floorAreaSize}
                    placeholder="Floor Area Size"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required halfWidth>
                  <InputLabel htmlFor="numberOfRooms">Number Of Rooms</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="numberOfRooms"
                    name="numberOfRooms"
                    defaultValue={ad.numberOfRooms}
                    placeholder="Number Of Rooms"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required halfWidth>
                  <InputLabel htmlFor="pricePerMonth">Price Per Month</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="pricePerMonth"
                    name="pricePerMonth"
                    defaultValue={ad.pricePerMonth}
                    placeholder="Price Per Month"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required halfWidth>
                  <InputLabel htmlFor="lat">Latitude</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="lat"
                    name="lat"
                    defaultValue={ad.lat}
                    placeholder="Latitude"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required halfWidth>
                  <InputLabel htmlFor="lon">Longitude</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    label="Dense"
                    type="text"
                    id="lon"
                    name="lon"
                    defaultValue={ad.lon}
                    placeholder="Longitude"
                    margin="dense"
                    required={true}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <NativeSelect
                  defaultValue={ad.available}
                  input={<Input name="available" id="available" />}
                  onChange={this.handleChange}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Inavailable</option>
                </NativeSelect>
                </FormControl>
                <Button 
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  type="submit">
                  SAVE
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



export default connect(mapStateToProps, {getCurrentUser, logout, getApartmentId, editApartment})(withStyles(styles) (EditApartment))