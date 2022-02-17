import * as React from 'react';
import * as L from 'leaflet';
import { ContextProps, GridLayer, withLeaflet } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant/dist/Leaflet.GoogleMutant';
import * as GoogleMapsLoader from 'google-maps';


interface IGoogleMapsAddLayer {
  name: 'BicyclingLayer' | 'TrafficLayer' | 'TransitLayer';
  options?: any;
}

interface IProps extends L.gridLayer.GoogleMutantOptions, ContextProps {
  zIndex?: number;
  useGoogMapsLoader?: boolean;
  googleMapsLoaderConf?: Partial<typeof GoogleMapsLoader>;
  googleMapsAddLayers?: IGoogleMapsAddLayer[];
  ref?: React.Ref<any>;
}

class ReactLeafletGoogleLayer extends GridLayer<IProps> {
  public static defaultProps: IProps = {
    useGoogMapsLoader: true,
    googleMapsLoaderConf: { VERSION: undefined },
    googleMapsAddLayers: undefined
  };

  public createLeafletElement(props: IProps) {
    const { useGoogMapsLoader, googleMapsLoaderConf, googleMapsAddLayers, leaflet, ...googleMutantProps } = props;
    if (useGoogMapsLoader) {
      let googleMapsLoader = GoogleMapsLoader;
      googleMapsLoader = Object.assign(googleMapsLoader, googleMapsLoaderConf);
      googleMapsLoader.load();
    }
    this.leafletElement = L.gridLayer.googleMutant(googleMutantProps)
    if (googleMapsAddLayers) {
      googleMapsAddLayers.forEach((layer) => {
        (this.leafletElement as L.gridLayer.GoogleMutant).addGoogleLayer(layer.name, layer.options);
      });
    }    
    return this.leafletElement;
  }

  public addGoogleLayer = (name: string, options?: any) => {
    (this.leafletElement as L.gridLayer.GoogleMutant).addGoogleLayer(name, options);
  }

  public removeGoogleLayer = (name: string) => {
    (this.leafletElement as L.gridLayer.GoogleMutant).removeGoogleLayer(name);
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
