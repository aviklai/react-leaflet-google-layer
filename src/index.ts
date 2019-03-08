import * as React from 'react';
import * as L from 'leaflet';
import { ContextProps, GridLayer, withLeaflet } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant';
import * as GoogleMapsLoader from 'google-maps';

type GoogleMapsLoaderTypes = typeof GoogleMapsLoader;
interface IProps extends L.gridLayer.GoogleMutantOptions, ContextProps {
  zIndex?: number;
  googleMapsLoaderConf: GoogleMapsLoaderTypes
}

class ReactLeafletGoogleLayer extends GridLayer<IProps> {
  public createLeafletElement(props: IProps) {
    let googleMapsLoader = GoogleMapsLoader;
    googleMapsLoader = Object.assign(googleMapsLoader, props.googleMapsLoaderConf);
    GoogleMapsLoader.load();
    this.leafletElement = L.gridLayer.googleMutant(props);
    return this.leafletElement;
  }

  public updateLeafletElement(prevProps: IProps, nextProps: IProps) {
    const { opacity, zIndex } = nextProps;
    if (opacity !== undefined && opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(opacity);
    }
    if (zIndex !== undefined && zIndex !== prevProps.zIndex) {
      this.leafletElement.setZIndex(zIndex);
    }
  }
}

export default withLeaflet(ReactLeafletGoogleLayer);
