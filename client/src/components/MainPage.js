import React,{PureComponent} from 'react';
import Grid from 'react-flexbox-grid/lib/components/Grid';
import { Row } from 'react-flexbox-grid/lib';
import { Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core';
import ApartmentsList from './List/ApartmentsList';
import MainMap from './Map/MainMap';
import grey from '@material-ui/core/colors/grey';


const styles = theme =>({
  map:{
    backgroundColor: grey[300],
  },
  list:{
    backgroundColor: grey[300],
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
            <ApartmentsList/>
          </Col>
          <Col className={classes.map} lg={9}> 
            <MainMap/>
          </Col>
        </Row>
      </Grid>)
  }
}

export default withStyles(styles) (MainPage)