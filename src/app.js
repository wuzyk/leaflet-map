import angular from 'angular';

import './app.css';
import template from './app.html';
import MapModule from './components/map/map';

angular.module('app', [
  MapModule.name,
])
.directive('app', () => ({
  template,
}))
