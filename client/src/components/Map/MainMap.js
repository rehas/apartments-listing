import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import {Marker, markerStyle} from '../../styles/MarkerStyle'

class MainMap extends Component {

  averageLatLon = () =>{

    const list = this.props.listedApartments

    const averageLat= list && (list.page.reduce((agg, cur)=> {
      
      return agg = cur.lat + agg
    }, 0) / list.page.length)


    const averageLon= list && (list.page.reduce((agg, cur)=> {
      return agg = cur.lon + agg
    }, 0) / list.page.length)

    return {
      lat: averageLat,
      lng: averageLon
    }
  }

  static defaultProps = {
    center: {
      lat: 52.36,
      lng: 4.90
    },
    zoom: 10
  };

  render() {
    
    let ctr = this.props.center
    if(this.averageLatLon().lat && this.averageLatLon().lng){
      ctr = this.averageLatLon()
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBtwrZKzU9aPo9NVAuRL5thuWhWo0Cr1b8' }}
          defaultCenter={this.props.center}
          center={ctr}
          defaultZoom={this.props.zoom}
        >
        {this.props.listedApartments && 
        this.props.listedApartments.page.map(apartment => {
          return (
            <Marker
            key={apartment.id}
            lat={apartment.lat}
            lng={apartment.lon}
            style= {markerStyle}
            text={apartment.id}
          />
          )
        })
        }
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listedApartments : state.apartmentsList,
  }
}

export default connect(mapStateToProps)( MainMap);