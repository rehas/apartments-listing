import React, {PureComponent} from 'react'
import { Card, CardContent, Typography, withStyles, Button } from '@material-ui/core';

const styles = theme=>  ({
  cardActive: {
    minWidth: '100%',
    backgroundColor : theme.palette.primary.light,
    marginBottom: '10px'
  },
  cardPassive: {
    minWidth: '100%',
    backgroundColor : theme.palette.secondary.light,
    marginBottom: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    color: theme.palette.primary.dark
  },
  pos: {
    marginBottom: 12,
  },
})

class ListItem extends PureComponent{
  render(){
    console.log(this.props)
    const item = this.props.data
    const {classes} = this.props
    return (
      <div>
        {
          item && 
          <Card className={item.available? classes.cardActive : classes.cardPassive}>
            <CardContent>
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