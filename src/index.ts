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

const updateLeafletElement = (
  instance: L.GridLayer,
  props: IProps,
  prevProps: IProps
) => {
  let prevGoogleMapsAddLayers = prevProps.googleMapsAddLayers
    ? prevProps.googleMapsAddLayers.map((addLayer: IGoogleMapsAddLayer) => addLayer.name)
    : [];
  let currentGoogleMapsAddLayers = props.googleMapsAddLayers
    ? props.googleMapsAddLayers.map((addLayer: IGoogleMapsAddLayer) => addLayer.name)
    : [];
  if (props.googleMapsAddLayers) {
    props.googleMapsAddLayers.forEach((layer) => {
      if (prevGoogleMapsAddLayers.indexOf(layer.name) === -1) {
        (instance as L.gridLayer.GoogleMutant).addGoogleLayer(
          layer.name,
          layer.options
        );
      }
    });
  if (prevProps.googleMapsAddLayers) 
    prevProps.googleMapsAddLayers.forEach((layer) => {
      if (currentGoogleMapsAddLayers.indexOf(layer.name) === -1) {
        (instance as L.gridLayer.GoogleMutant).removeGoogleLayer(layer.name);
      }
    });
  }

  updateGridLayer(instance, props, prevProps);
};

export default createLayerComponent<L.GridLayer, LayerProps & IProps>(
  createLeafletElement,
  updateLeafletElement
);
