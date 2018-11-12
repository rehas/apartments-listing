import React, {PureComponent} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {getCurrentUser, getAllUsers} from '../../actions/users'
import EditIcon from '@material-ui/icons/Edit';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign : 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class UsersList extends PureComponent {

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
    this.props.currentUser && this.props.getAllUsers(this.props.currentUser.jwt)
  }
  render(){
    const { currentUser: cu, currentUserDetails : cud, allUsers : au} = this.props
    
    if (cu&& cud && cud.userType !== 'admin' ){
      this.props.logout()
      this.props.history.push('/')
    }

    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell >User Id</CustomTableCell>
              <CustomTableCell >Full Name</CustomTableCell>
              <CustomTableCell >Email</CustomTableCell>
              <CustomTableCell >User Type</CustomTableCell>
              <CustomTableCell >Apartments Created</CustomTableCell>
              <CustomTableCell >Edit</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {au&&au.map(user => {
              const count = user.apartments.length
              return (
                <TableRow className={classes.row} key={user.id}>
                  <CustomTableCell numeric>{user.id}</CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {user.fullName}
                  </CustomTableCell>
                  <CustomTableCell numeric>{user.email}</CustomTableCell>
                  <CustomTableCell numeric>{user.userType}</CustomTableCell>
                  <CustomTableCell numeric>{count}</CustomTableCell>
                  <CustomTableCell numeric>
                    <Link to={`/users/${user.id}`} >
                      <EditIcon/>
                    </Link>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state =>{
  return {
    currentUser: state.currentUser,
    currentUserDetails: state.currentUserDetails,
    allUsers : state.allUsers
  }
}

const mapDispatchToProps = {
  getAllUsers,
  getCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(UsersList))
