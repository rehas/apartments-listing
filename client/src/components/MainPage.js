import React,{PureComponent} from 'react';
import Grid from 'react-flexbox-grid/lib/components/Grid';
import { Row } from 'react-flexbox-grid/lib';
import { Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core';
import ApartmentsList from './List/ApartmentsList';
import SimpleMap from './Map/MainMap';

const styles = theme =>({
  map:{
    backgroundColor: 'blue',
  },
  list:{
    backgroundColor: 'yellow',
  },
  root: {
    height : '100%',
  },
})

class MainPage extends PureComponent{
  render(){
    const {classes} = this.props
    return (
      <Grid fluid className={classes.root} >
        <Row  className={classes.root}  >
          <Col className={classes.list} lg={3}>
            Listing
            <ApartmentsList/>
          </Col>
          <Col className={classes.map} lg={9}> Map
            <SimpleMap/>
          </Col>
        </Row>
      </Grid>)
  }
}

export default withStyles(styles) (MainPage)