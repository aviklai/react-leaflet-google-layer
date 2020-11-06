[![Build Status](https://travis-ci.org/aviklai/react-leaflet-google-layer.svg?branch=master)](https://travis-ci.org/aviklai/react-leaflet-google-layer) 
[![Coverage Status](https://coveralls.io/repos/github/aviklai/react-leaflet-google-layer/badge.svg?branch=master)](https://coveralls.io/github/aviklai/react-leaflet-google-layer?branch=master) 
[![npm version](https://img.shields.io/npm/v/react-leaflet-google-layer.svg)](https://www.npmjs.com/package/react-leaflet-google-layer)

Google layer for React-Leaflet using leaflet.gridlayer.googlemutant, implemented with typescript.

## Requirements
This version of the library supports React Leaflet v2.

## Installation instructions:
1. run `npm install --save react-leaflet-google-layer@"^1.x.x"`
2. By default this library uses the google-maps loader library to load the google maps api. If you want to use the script tag instead, you can Add google maps js api in your index.html: <br/> 
`<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" async defer></script>` <br/>
and set the prop useGoogMapsLoader to `false`.


Usage example:
```
import * as React from 'react';
import { Map } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

export class App extends React.Component { 
  render() {    
    return (
      <Map zoom={15} center={[45, 20]}>
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{KEY: 'YOUR_API_KEY'}} type={'satellite'} />
      </Map>
    );
  }
}
```

## Basic usage example
https://codesandbox.io/s/basicusage-qluec

## Options
useGoogMapsLoader?: boolean, default: `true` <br/>
googleMapsAddLayers?: { name: 'BicyclingLayer' | 'TrafficLayer' | 'TransitLayer', options?: any }[] <br/>
zIndex?: number <br/>

#### From google-maps (https://github.com/Carrooi/Js-GoogleMapsLoader) - googleMapsLoaderConf prop:
* KEY?: string
* URL?: string
* LIBRARIES?: string[]
* CLIENT?: string
* CHANNEL?: string
* LANGUAGE?: string
* REGION?: string
* VERSION?: string
* WINDOW_CALLBACK_NAME?: string

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

