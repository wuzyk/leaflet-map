import calcAzimuth from './map.utils';

import iconImageUrl from './marker.svg';

const MIN_ICON_SIZE = 10;
const MAX_ICON_SIZE = 100;
const MAX_ZOOM = 18;

const getIconSizeByZoom = zoom =>
  MIN_ICON_SIZE + ((zoom * (MAX_ICON_SIZE - MIN_ICON_SIZE)) / MAX_ZOOM);

const createPath = ([lat1, lng1], [lat2, lng2]) => ({
  color: 'gray',
  weight: 3,
  dashArray: '10 10',
  latlngs: [
    {
      lat: lat1,
      lng: lng1,
    },
    {
      lat: lat2,
      lng: lng2,
    },
  ],
});

const createMarker = (lat, lng, iconAngle) => ({
  lat,
  lng,
  iconAngle,
  icon: {},
});

export default class MapController {
  constructor($scope, $http, mapService, leafletBoundsHelpers) {
    this.center = {};
    this.paths = [];
    this.markers = [];
    this.bounds = leafletBoundsHelpers.createBoundsFromArray(mapService.bounds);

    mapService.getPaths().forEach(([point1, point2]) => {
      this.paths.push(createPath(point1, point2));

      const angle = calcAzimuth(point1, point2);
      this.markers.push(
        createMarker(point1[0], point1[1], angle - 90),
        createMarker(point2[0], point2[1], angle + 90),
      );
    });

    $http.get(iconImageUrl).then((response) => {
      const image = `data:image/svg+xml;base64,${global.btoa(response.data)}`;
      for (let i = 0; i < this.markers.length; i += 1) {
        this.markers[i].icon.iconUrl = image;
      }
    });

    $scope.$watch('map.center.zoom', (zoom) => {
      const size = getIconSizeByZoom(zoom);

      for (let i = 0; i < this.markers.length; i += 1) {
        this.markers[i].icon.iconSize = [size, size];
        this.markers[i].icon.iconAnchor = [size / 2, size / 2];
      }
    });
  }
}
