import React, { Component } from 'react';
import { Map, Marker,InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};



export class MapContainer extends Component {


  render() {
    return (
      <Map
        google={this.props.google}
        zoom={17}
        style={mapStyles}
        initialCenter={{
         lat: 43.639118,
         lng: -79.425194
        }}
      >
          <Marker
          name={'Dare and Defy'}
        />
        <InfoWindow><div>
            <h4>Dare and Defy</h4>
          </div></InfoWindow>
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCJt2jpZ-01wFmJ4HY8iunnSJKH3aXD4qc'
})(MapContainer);