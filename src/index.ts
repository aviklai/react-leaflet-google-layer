import * as React from 'react';
import * as L from 'leaflet';
import { ContextProps, GridLayer, withLeaflet } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant';
import { TileLayerOptions, Point } from 'leaflet';

// Type definitions for leaflet.gridlayer.googlemutant 0.4
// Project: https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant#README
// Definitions by: Ernest Rhinozeros <https://github.com/ernest-rhinozeros>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
type GoogleMutantType = 'roadmap' | 'satellite' | 'terrain' | 'hybrid';

interface IGoogleMutantStyler {
  hue?: string;
  lightness?: number;
  saturation?: number;
  gamma?: number;
  invert_lightness?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
}

/**
 * Google's map style.
 *
 * https://developers.google.com/maps/documentation/javascript/style-reference
 */
interface IGoogleMutantStyle {
  /**
   * https://developers.google.com/maps/documentation/javascript/style-reference#style-features
   */
  featureType?: string;

  /**
   * https://developers.google.com/maps/documentation/javascript/style-reference#style-elements
   */
  elementType?: string;

  /**
   * https://developers.google.com/maps/documentation/javascript/style-reference#stylers
   */
  stylers?: IGoogleMutantStyler[];
}

interface IGoogleMutantOptions extends TileLayerOptions {
  minZoom?: number;
  maxZoom?: number;
  maxNativeZoom?: number;
  tileSize?: number | Point;
  subdomains?: string | string[];
  errorTileUrl?: string;

  /**
   * The mutant container will add its own attribution anyways.
   */
  attribution?: string;

  opacity?: number;
  continuousWorld?: boolean;
  noWrap?: boolean;

  /**
   * Google's map type. 'hybrid' is not really supported.
   */
  type?: GoogleMutantType;

  /**
   * Google's map styles.
   */
  styles?: IGoogleMutantStyle[];
}

interface IProps extends IGoogleMutantOptions, ContextProps {
  opacity?: number;
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
