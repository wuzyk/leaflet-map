import angular from 'angular';
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-plugins/layer/Marker.Rotate';
import 'angular-leaflet-directive';

import component from './map.component';
import controller from './map.controller';
import service from './map.service';

export default angular.module('map', [
  'leaflet-directive',
])
.directive('map', component)
.service('mapService', service)
.controller('MapController', controller);
