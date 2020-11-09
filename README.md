[![Build Status](https://travis-ci.org/aviklai/react-leaflet-google-layer.svg?branch=master)](https://travis-ci.org/aviklai/react-leaflet-google-layer) 
[![Coverage Status](https://coveralls.io/repos/github/aviklai/react-leaflet-google-layer/badge.svg?branch=master)](https://coveralls.io/github/aviklai/react-leaflet-google-layer?branch=master) 
[![npm version](https://img.shields.io/npm/v/react-leaflet-google-layer.svg)](https://www.npmjs.com/package/react-leaflet-google-layer)

Google layer for React Leaflet v3 using leaflet.gridlayer.googlemutant, implemented with typescript.

## Requirements
The current version of this library supports React Leaflet v3. <br/>
If you are using React Leaflet v2, please use the previous version of this library. Please see the documentation here: <br/>
https://github.com/aviklai/react-leaflet-google-layer/tree/v1

## Installation instructions:
1. run `npm install --save react-leaflet-google-layer`
2. By default this library uses the google-maps loader library to load the google maps api. If you want to use the script tag instead, you can Add google maps js api in your index.html: <br/> 
`<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" async defer></script>` <br/>
and set the prop useGoogMapsLoader to `false`.


Usage example:
```
import * as React from 'react';
import { MapContainer } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

export const App = () => { 
  return (
      <MapContainer zoom={15} center={[45, 20]}>
        <ReactLeafletGoogleLayer apiKey='YOUR_API_KEY' type={'satellite'} />
      </MapContainer>
  );
};

```

## Basic usage example
https://codesandbox.io/s/basic-usage-with-react-leaflet-v3-vx8fd

## Options
apiKey?: string <br/>
useGoogMapsLoader?: boolean, default: `true` <br/>
googleMapsAddLayers?: { name: 'BicyclingLayer' | 'TrafficLayer' | 'TransitLayer', options?: any }[] <br/>
zIndex?: number <br/>

#### From js-api-loader (https://github.com/googlemaps/js-api-loader) - googleMapsLoaderConf prop:
* version?: string
* client?: string
* channel?: string
* language?: string
* region?: string
* libraries?: string[]

#### From googlemutant (https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant):
* minZoom?: number
* maxZoom?: number
* maxNativeZoom?: number
* tileSize?: number | Point
* subdomains?: string | string[]
* errorTileUrl?: string
* attribution?: string
* opacity?: number
* continuousWorld?: boolean
* noWrap?: boolean
* type?: 'roadmap' | 'satellite' | 'terrain' | 'hybrid'

