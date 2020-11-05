import * as React from 'react';
import * as L from 'leaflet';
import { createLayerComponent, updateGridLayer, LeafletContextInterface, LayerProps } from '@react-leaflet/core';
import 'leaflet.gridlayer.googlemutant';
import * as GoogleMapsLoader from 'google-maps';


interface IGoogleMapsAddLayer {
  name: 'BicyclingLayer' | 'TrafficLayer' | 'TransitLayer';
  options?: any;
}

interface IProps extends L.gridLayer.GoogleMutantOptions {
  zIndex?: number;
  useGoogMapsLoader?: boolean;
  googleMapsLoaderConf?: Partial<typeof GoogleMapsLoader>;
  googleMapsAddLayers?: IGoogleMapsAddLayer[];
  ref?: React.Ref<any>;
}

const createLeafletElement = (props: IProps, context: LeafletContextInterface) => {
  const { useGoogMapsLoader = true, googleMapsLoaderConf = { VERSION: undefined }, googleMapsAddLayers, ...googleMutantProps } = props;
  if (useGoogMapsLoader) {
    let googleMapsLoader = GoogleMapsLoader;
    googleMapsLoader = Object.assign(googleMapsLoader, googleMapsLoaderConf);
    googleMapsLoader.load();
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