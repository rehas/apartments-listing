import React, {PureComponent} from 'react'
import { Card, CardContent, Typography, withStyles, Button, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Edit from '@material-ui/icons/Edit';

const styles = theme=>  ({
  cardActive: {
    minWidth: '100%',
    backgroundColor : theme.palette.primary.light,
    marginBottom: '10px',
    height: '110px',
  },
  cardPassive: {
    minWidth: '100%',
    backgroundColor : theme.palette.secondary.light,
    marginBottom: '10px',
    height: '90px',
  },
  title: {
    fontSize: 18,
    color: theme.palette.primary.dark,
    margin: '1px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
  },
  content: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  editIcon: {
    height: 28,
    width: 28,
  },
})

class ListItem extends PureComponent{
  render(){
    // console.log(this.props)
    const item = this.props.data
    const {classes} = this.props
    const {noApartments} = this.props

    if(noApartments){
      return (
        <div>
          <Card className={classes.cardPassive}>
            <CardContent className={classes.content}>
              <Typography className={classes.title}>
                No Apartments Found! 
              </Typography>
           </CardContent>
           </Card>   
        </div>
      )
    }

    return (
      <div>
        {
          item && 
          <Card className={item.available? classes.cardActive : classes.cardPassive}>
          {this.props.canEdit &&
                <span className={classes.controls}>
                <IconButton aria-label="Edit" className={classes.editIcon}>
                  <Link to={`/apartments/${item.id}`}>
                  <Edit  />
                  </Link>
                </IconButton>
              </span> 
              }
            <CardContent className={classes.content}>
              <Typography className={classes.title}>
                Name : {item.name} {!item.available ? " -- Sold Out" : ""}
              </Typography>
              <Typography variant="subtitle1">
                Size : {item.floorAreaSize} m<sup>2</sup> 
                <span> -- </span>
                PPM : {item.pricePerMonth} $
              </Typography>
              <Typography>
                Number Of Rooms : {item.numberOfRooms}
              </Typography>
              
            </CardContent>
          </Card>
        }
      </div>
    )
  }
}

export default withStyles(styles) (ListItem)