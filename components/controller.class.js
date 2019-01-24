'use strict';
import Map from './map.class.js';
import Panel from './panel.class.js';
export default class Controller {
  constructor(container) {
    this.geocoderOff = true;
    this.scoutVolunteers = null;
    this.map = new Map({
      styleURL: 'mapbox://styles/mapbox',
      mapContainer: 'map',
      geocoder: true,
      baseLayers: {
        street: 'streets-v10',
        satellite: 'cj774gftq3bwr2so2y6nqzvz4'
      },
      center: [-83.10, 42.36],
      zoom: 11,
      boundaries: {
        sw: [-83.3437,42.2102],
        ne: [-82.8754,42.5197]
      },
      sources: [
        {
          id: "greenlight-locations",
          type: "geojson",
          data: 'https://data.detroitmi.gov/resource/xgha-35ji.geojson'
        },
        {
          id: "single-point",
          type: "geojson",
          data: {
              "type": "FeatureCollection",
              "features": []
          }
        }
      ],
      layers: [
        {
          id: "greenlight-locations-points",
          "source": "greenlight-locations",
          "type": "circle",
          "paint": {
              "circle-radius": 8,
              "circle-color": "#004544"
          }
        },
        {
          id: "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
        }
      ]
    });
    this.panel = new Panel(container);
  }
  
  initialForm(ev,controller){
    switch (ev) {
      case 'v-sign-up':
        document.querySelector('#user-type-section').className = 'hidden';
        document.querySelector('section.application').className = 'application';
        break;
      default:

    }
  }

  updatePanel(ev, controller){
    // console.log(ev);
    // console.log(this.panel);
    this.panel.buildPanel(ev);
  }

  geoResults(ev, controller){
    controller.map.geocoder.setInput('');
    controller.map.map.getSource('single-point').setData(ev.result.geometry);
    controller.map.map.flyTo({
      center: ev.result.center,
      zoom: 13,
      speed: 1,
      curve: 1,
      easing(t) {
        return t;
      }
    });
  }
}
