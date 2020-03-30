import Chart from 'chart.js';
import pattern from 'patternomaly';

const createTiles = (tiles, data) => {
  const { DomUtil } = require('leaflet');

  tiles.createTile = function(coords) {
    const tile = DomUtil.create('canvas', 'leaflet-tile');
    const ctx = tile.getContext('2d');
    const size = this.getTileSize();
    const newCoords = `${coords.z}/${coords.x}/${coords.y}`;
    const currentTile = data?.tiles?.find(({ key }) => key === newCoords);

    tile.setAttribute('width', size.x);
    tile.setAttribute('height', size.y);

    if (currentTile) {
      const { fever, dry_cough, fatigue } = currentTile || {};

      const myChart = new Chart(ctx, {
        type: 'pie',
        legend: {
          display: false,
        },
        data: {
          labels: ['Koorts', 'Droge hoest', 'Vermoeidheid'],
          datasets: [
            {
              label: 'Symptoms',
              data: [fever, dry_cough, fatigue],
              backgroundColor: [
                pattern.draw('diagonal-right-left', 'rgb(26, 26, 26, 0.4)'),
                pattern.draw('diagonal-right-left', 'rgb(27, 66, 216, 0.4)'),
                pattern.draw('diagonal-right-left', 'rgb(255, 160, 21, 0.4)'),
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          animation: {
            animateRotate: true,
          },
        },
      });
    }

    return tile;
  };
};

const drawMap = (setMapBounds, data) => {
  const { Map, GridLayer, tileLayer } = require('leaflet');
  const map = new Map('map', { minZoom: 2, maxZoom: 13, reset: true }).setView([52.5, 6], 8);
  const tiles = new GridLayer();

  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  map.on('moveend', () => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    setMapBounds({
      zoom,
      top: bounds._northEast.lat,
      right: bounds._northEast.lng,
      bottom: bounds._southWest.lat,
      left: bounds._southWest.lng,
    });
  });

  createTiles(tiles, data);

  tiles.addTo(map);

  return map;
};

export const renderCharts = async (map, data) => {
  const layer = map?._layers && Object.keys(map._layers).find((layer) => !map._layers[layer]._url);

  const tiles = map?._layers[layer];

  createTiles(tiles, data);

  tiles.addTo(map);

  return map;
};

export default drawMap;
