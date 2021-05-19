import * as React from 'react';
import ReactDOM from 'react-dom';
import ReactLeafletGoogleLayer from '../index';
import { MapContainer } from 'react-leaflet';
import * as ReactTestUtils from 'react-dom/test-utils';
import { initialize } from '@googlemaps/jest-mocks';

describe('ReactLeafletGoogleLayer', () => {
  beforeEach(() => {
    initialize();
  })
  it('Draw HTML element', () => {
    expect(ReactLeafletGoogleLayer);   
    const dom = ReactTestUtils.renderIntoDocument(
      <div>
        <MapContainer>
          <ReactLeafletGoogleLayer />
        </MapContainer>
      </div>
    ) as any;
    const component = ReactDOM.findDOMNode(dom.childNodes[0]) as any;
    expect(component).toBeInstanceOf(HTMLElement);
  });

  it('Adding google layers', () => {
    expect(ReactLeafletGoogleLayer);   
    const dom = ReactTestUtils.renderIntoDocument(
      <div>
        <MapContainer>
          <ReactLeafletGoogleLayer googleMapsAddLayers={[{name: 'TrafficLayer'}]} />
        </MapContainer>
      </div>
    ) as any;
    const component = ReactDOM.findDOMNode(dom.childNodes[0]) as any;
    expect(component).toBeInstanceOf(HTMLElement);
  });
});
