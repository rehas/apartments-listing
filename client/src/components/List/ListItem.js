import React, {PureComponent} from 'react'
import { Card, CardContent, Typography, withStyles, Button } from '@material-ui/core';

const styles = theme=>  ({
  cardActive: {
    minWidth: '100%',
    backgroundColor : theme.palette.primary.light,
    marginBottom: '10px',
    height: '90px',
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
  content: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
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
                
              </Typography>
              <Typography>
                Number Of Rooms : {item.numberOfRooms}
              </Typography>
              {this.props.canEdit && 
              <Button>Edit / Delete</Button>
              }
            </CardContent>
          </Card>
        }
      </div>
    )
  }
}

export default withStyles(styles) (ListItem)