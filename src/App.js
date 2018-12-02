import React, { Component } from 'react';
import MyText from './MyText.js';
import haverDistance from './myHaverSine.js';

//IMPORT AF VORES KOMPONENTER
import Baggrund from './pagedraw/baggrund.js';

//HARDCODEDE LOKATIONER   ||   stedets navn, kunstner, koordinater
let Rust = {name : 'RUST', description:' Her spiller RexLife',coords:{latitude:55.691226 , longitude :12.559283 }}; /// A sample target location
let mayhem = {name : 'MAYHEM', description:'Her spiller XX kunstner',coords:{latitude:55.707521 , longitude :12.553489 }};
let runddelensBodega = {name : 'Runddelens Bodega', description:'Her spiller XX kunstner',coords:{latitude:55.694238 , longitude :12.528339 }};
let DrKoncerthus = {name : 'DR Koncerthuset', description:' Her spiller XX kunstner',coords:{latitude:55.657913 , longitude :12.588996 }};
let Stengade = {name : 'Stengade', description:' Her spiller XX kunstner',coords:{latitude:55.688207 , longitude :12.555598 }};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 0,
      targetName : '',
      targetDescription :'',
      venue: ''
    
    };
    this.e = null;
    this.geoError = this.geoError.bind(this);
    this.getMyPosition = this.getMyPosition.bind(this);
  }

  geoError(err) {
    this.e = err.message;
  }

  // Hver lokation i forhold til egen position
  getMyPosition(position) {
    let RustDistance = haverDistance(position.coords.latitude,Rust.coords.latitude,position.coords.longitude,Rust.coords.longitude);
    let mayhemDistance = haverDistance(position.coords.latitude,mayhem.coords.latitude,position.coords.longitude,mayhem.coords.longitude);
    let DrKoncerthusDistance = haverDistance(position.coords.latitude,DrKoncerthus.coords.latitude,position.coords.longitude,DrKoncerthus.coords.longitude);
    let StengadeDistance = haverDistance(position.coords.latitude,Stengade.coords.latitude,position.coords.longitude,Stengade.coords.longitude);
    let runddelensBodegaDistance = haverDistance(position.coords.latitude,runddelensBodega.coords.latitude,position.coords.longitude,runddelensBodega.coords.longitude);
  
    // Loop, der går igennem vores array og sammenligner med closest og erstatter den foregående lokation med den næste, hvis afstanden er mindre
    let closest = null
    let closestVenue = null
    let venues = [Rust,mayhem,DrKoncerthus,Stengade,runddelensBodega]
    let distanceArray = [RustDistance,mayhemDistance,DrKoncerthusDistance,StengadeDistance,runddelensBodegaDistance]
    distanceArray.forEach(function(entry, i) {
      if (closest === null) {
        closest = entry
        closestVenue = venues[i]
      } else {
        if (closest > entry) {
          closest = entry
          closestVenue = venues[i]
        }
      }
    });

    // Her viser vi spillestedet, der er tættest på. 
    console.log(closest, closestVenue)
    alert(closestVenue.name) // popup her!!

    this.setState({
      distance: closest,
      latitude: closestVenue.coords.latitude,
      longitude: closestVenue.coords.longitude,
      venue: closestVenue.name
    });
  }


  render() {
    return (
     <div>
      <MyText textToDisplay = {'My Latitude :' + this.state.latitude}/>
        <MyText textToDisplay = {'MyLongitude: ' +  this.state.longitude} />
        <MyText textToDisplay = {'Distance til målet i meter:' +Math.round(1000*this.state.distance)}/>
        <MyText textToDisplay = { 'Venue: ' + this.state.venue}/>

      <Baggrund 
        firsttext={'My Latitude :' + this.state.latitude}
        MyButton= {'Klik for position'} 
        GetMyPosition = {this.getMyPosition} 
        GeoError = {this.geoError} 
        />
      </div>
    );
  }
}

export default App;
