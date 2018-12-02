import  React, { Component } from 'react';

class GeoPullComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.GeoOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1} // Hardcoded for now

    this.GetPosition = this.GetPosition.bind(this);
    
  }

GetPosition()
{

    navigator.geolocation.getCurrentPosition(this.props.GetMyPosition,this.props.GeoError , this.GeoOptions);
}


// Do we want standard button here or .....well it is standard for now
  render() {
    return (<div>
    
      <button  onClick = {this.GetPosition}> {this.props.buttonText }</button>
    </div> );
    
  }
}


export default GeoPullComponent;