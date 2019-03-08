import * as React from 'react';
import * as L from 'leaflet';
import { ContextProps, GridLayer, withLeaflet } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant';

interface IProps extends L.gridLayer.GoogleMutantOptions, ContextProps {
  zIndex?: number;
}

class ReactLeafletGoogleLayer extends GridLayer<IProps> {
  public createLeafletElement(props: IProps) {
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
