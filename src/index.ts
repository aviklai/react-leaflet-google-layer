import * as React from 'react';
import * as L from 'leaflet';
import { createLayerComponent, updateGridLayer, LeafletContextInterface, LayerProps } from '@react-leaflet/core';
import 'leaflet.gridlayer.googlemutant';
import { Loader, LoaderOptions } from 'google-maps';


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

const createLeafletElement = (props: IProps, context: LeafletContextInterface) => {
  const { apiKey, useGoogMapsLoader = true, googleMapsLoaderConf = {}, googleMapsAddLayers, ...googleMutantProps } = props;
  if (useGoogMapsLoader) {
    const loader = new Loader(apiKey, googleMapsLoaderConf);
    loader.load();
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