import * as React from 'react';
import ReactLeafletGoogleLayer from '../index';
import { Map } from 'react-leaflet';
import 'leaflet.gridlayer.googlemutant';
import * as ReactTestUtils from 'react-dom/test-utils';

test('ReactLeafletGoogleLayer', () => {
  expect(ReactLeafletGoogleLayer);

  const component = ReactTestUtils.renderIntoDocument(
    <Map>
      <ReactLeafletGoogleLayer />
    </Map>
  ) as any;
  expect(component.leafletElement._container).toBeDefined()  

});
