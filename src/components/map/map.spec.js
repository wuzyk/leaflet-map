import map from './map';
import MapService from './map.service';
import iconImageUrl from './marker.svg';

describe('map', () => {
  describe('service', () => {
    let mapService;

    beforeEach(() => {
      mapService = new MapService();
      mapService.pathsCount = 2;
    });

    it('should contain bounds', () => {
      expect(mapService.bounds).toBeDefined();
    });

    it('getPath method should return paths', () => {
      const paths = mapService.getPaths();
      expect(paths.length).toBe(2);
    });
  });

  describe('controller', () => {
    let ctrl;
    let $scope;
    let $httpBackend;

    const path = [[10, 10], [20, 20]];

    const mapService = {
      bounds: [[50, 50], [0, 0]],
      getPaths: () => ([
        path,
      ]),
    };

    beforeEach(() => {
      angular.mock.module(map.name);

      angular.mock.inject(($rootScope, $controller, $injector) => {
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', iconImageUrl).respond(200);

        $scope = $rootScope.$new();

        ctrl = $controller('MapController as map', { $scope, mapService });
      });
    });

    it('should contain markers', () => {
      expect(ctrl.markers.length).toBe(2);
      expect(ctrl.markers[0].lat).toBe(path[0][0]);
      expect(ctrl.markers[0].lng).toBe(path[0][1]);
      expect(ctrl.markers[1].lat).toBe(path[1][0]);
      expect(ctrl.markers[1].lng).toBe(path[1][1]);
    });

    it('should contain paths', () => {
      expect(ctrl.paths.length).toBe(1);
      expect(ctrl.paths[0].latlngs.length).toBe(2);
      expect(ctrl.paths[0].latlngs[0].lat).toBe(path[0][0]);
      expect(ctrl.paths[0].latlngs[0].lng).toBe(path[0][1]);
      expect(ctrl.paths[0].latlngs[1].lat).toBe(path[1][0]);
      expect(ctrl.paths[0].latlngs[1].lng).toBe(path[1][1]);
    });

    it('should turn markers to each other', () => {
      expect(Math.abs(ctrl.markers[0].iconAngle - ctrl.markers[1].iconAngle)).toBe(180);
    });

    it('should load icon image', () => {
      $httpBackend.flush();
      expect(ctrl.markers[0].icon.iconUrl).toBeDefined();
    });

    it('should scale markers when zoom changes', () => {
      ctrl.center.zoom = 0;
      $scope.$digest();
      expect(ctrl.markers[0].icon.iconSize[0]).toBe(10);

      ctrl.center.zoom = 18;
      $scope.$digest();
      expect(ctrl.markers[0].icon.iconSize[0]).toBe(100);
    });
  });
});
