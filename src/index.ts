import * as React from 'react';
import * as L from 'leaflet';
import { createLayerComponent, updateGridLayer, LeafletContextInterface, LayerProps } from '@react-leaflet/core';
import 'leaflet.gridlayer.googlemutant';
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';


interface IGoogleMapsAddLayer {
  name: 'BicyclingLayer' | 'TrafficLayer' | 'TransitLayer';
  options?: any;
}

interface IProps extends L.gridLayer.GoogleMutantOptions {
  zIndex?: number;
  useGoogMapsLoader?: boolean;
  googleMapsLoaderConf?: LoaderOptions;
  googleMapsAddLayers?: IGoogleMapsAddLayer[];
  apiKey?: string;
}

let googleMapsScriptLoaded = false;

const createLeafletElement = (props: IProps, context: LeafletContextInterface) => {
  const { apiKey = '', useGoogMapsLoader = true, googleMapsLoaderConf = {}, googleMapsAddLayers, ...googleMutantProps } = props;
  if (useGoogMapsLoader && !googleMapsScriptLoaded) {
    const loader = new Loader({apiKey, ...googleMapsLoaderConf});
    loader.load();
    googleMapsScriptLoaded = true;
  }
  const instance = L.gridLayer.googleMutant(googleMutantProps)
  if (googleMapsAddLayers) {
    googleMapsAddLayers.forEach((layer) => {
      (instance as L.gridLayer.GoogleMutant).addGoogleLayer(layer.name, layer.options);
    });
  }    
  return { instance, context };
}


export default createLayerComponent<L.GridLayer, LayerProps & IProps>(createLeafletElement, updateGridLayer);