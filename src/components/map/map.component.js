import template from './map.html';

export default () => ({
  restrict: 'E',
  scope: {},
  template,
  controller: 'MapController',
  controllerAs: 'map',
  bindToController: true,
});
