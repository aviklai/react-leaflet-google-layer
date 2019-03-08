Google layer for React-Leaflet using leaflet.gridlayer.googlemutant, implemented with typescript.

Installation instructions:
1. Add google maps js api in your index.html: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" async defer></script>`

2. run `npm install --save react-leaflet-google-layer`


Usage example:
```
import * as React from 'react';
import { Map } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-mutant';

export class App extends React.Component { 
  render() {    
    return (
      <Map zoom={15} center={[45, 20]}>
        <ReactLeafletGoogleLayer type={'satellite'} />
      </Map>
    );
  }
}
```

