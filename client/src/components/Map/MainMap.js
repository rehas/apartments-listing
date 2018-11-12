import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import {Marker, markerStyle} from '../../styles/MarkerStyle'

class MainMap extends Component {
  static defaultProps = {
    center: {
      lat: 52.36,
      lng: 4.90
    },
    zoom: 12
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBtwrZKzU9aPo9NVAuRL5thuWhWo0Cr1b8' }}
          defaultCenter={this.props.center}
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