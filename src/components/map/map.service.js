const randomBetween = (from, to) => from + (Math.random() * (to - from));

const generatePoint = (bounds) => {
  const [[northEastLat, northEastLng], [southWestLat, southWestLng]] = bounds;

  return [
    randomBetween(southWestLat, northEastLat),
    randomBetween(southWestLng, northEastLng),
  ];
};

const generateRandomPaths = (count, bounds) => {
  const paths = [];

  for (let i = 0; i < count; i += 1) {
    paths.push([
      generatePoint(bounds),
      generatePoint(bounds),
    ]);
  }

  return paths;
};

export default class MapService {
  constructor() {
    this.pathsCount = 3;

    this.bounds = [
      [51.69724635547481, 0.37628173828125006],
      [51.31258868168418, -0.5561828613281251],
    ];

    this.getPaths = () => generateRandomPaths(this.pathsCount, this.bounds);
  }
}
