import React, {PureComponent} from 'react'
import { Card, CardContent, Typography, withStyles, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-flexbox-grid';
import Edit from '@material-ui/icons/Edit';
import ListItemStyles from '../../styles/ListItemStyles'

const styles = ListItemStyles

class ListItem extends PureComponent{
  render(){
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
          <Row lg={12}>
          <Col lg={1}>
          {this.props.canEdit &&
                <span className={classes.controls}>
                <IconButton aria-label="Edit" className={classes.editIcon}>
                  <Link to={`/apartments/${item.id}`}>
                  <Edit  />
                  </Link>
                </IconButton>
              </span> 
              }
            </Col>
            <Col lg={1} className={classes.vertical}>
              <Typography className={classes.vertical}>
                {!item.available ? "Sold" : ""}
              </Typography>
            </Col>
            <Col lg={10}>
            <CardContent className={classes.content}>
              <Typography className={classes.title}>
                Name : {item.name} 
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
            </Col>
          </Row>  
          </Card>
        }
      </div>
    )
  }
}

export default withStyles(styles) (ListItem)