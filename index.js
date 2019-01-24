import Controller from './components/controller.class';

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['greenlight-locations-points']
    });
    if (features.length) {
      // this.setFilter('radio-patrols-hover', ['==', 'FID', features[0].properties.FID]);
    }else{

    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('click', function (e, parent = this) {
    const features = this.queryRenderedFeatures(e.point, {
      layers: ['greenlight-locations-points']
    });
    // console.log(e.point);
    if (features.length) {
      console.log(features[0]);
      controller.updatePanel(features[0], controller);
      document.querySelector('.data-panel').className = 'data-panel active';
    } 
  });
  controller.map.geocoder.on('result', function (ev) {
    // console.log(ev);
    if(controller.geocoderOff){
      controller.geocoderOff = false;
      controller.geoResults(ev, controller);
    }else{
      console.log('extra call');
    }
  });

  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    document.querySelector('.data-panel.active').className = 'data-panel';
  });
  const startingBtns = document.querySelectorAll('#user-type-section button');
  startingBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.initialForm(ev.target.attributes[2].nodeValue, controller);
    });
  });
  const reloadPage = function reloadPage() {
    window.location.reload(true);
  };
})(window);
