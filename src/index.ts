import * as React from 'react';
import * as L from 'leaflet';
import { ContextProps, GridLayer, withLeaflet } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant';
import * as GoogleMapsLoader from 'google-maps';

interface IProps extends L.gridLayer.GoogleMutantOptions, ContextProps {
  zIndex?: number;
  useGoogMapsLoader?: boolean;
  googleMapsLoaderConf?: Partial<typeof GoogleMapsLoader>;
}

class ReactLeafletGoogleLayer extends GridLayer<IProps> {
  public static defaultProps: IProps = {
    useGoogMapsLoader: true,
    googleMapsLoaderConf: { VERSION: undefined },
  };

  public createLeafletElement(props: IProps) {
    const { useGoogMapsLoader, googleMapsLoaderConf, leaflet, ...googleMutantProps } = props;
    if (useGoogMapsLoader) {
      let googleMapsLoader = GoogleMapsLoader;
      googleMapsLoader = Object.assign(googleMapsLoader, googleMapsLoaderConf);
      googleMapsLoader.load();
    }
    this.leafletElement = L.gridLayer.googleMutant(googleMutantProps);
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
