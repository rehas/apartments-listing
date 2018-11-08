import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

const Marker = ({ text, style }) => <div style={style}>{text}</div>;

const K_WIDTH  = 50;
  const K_HEIGHT = 50;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 2
};

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
      <div style={{ height: '100vh', width: '100%' }}>
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