import Chart from 'chart.js';
import pattern from 'patternomaly';

const createTiles = (tiles, data) => {
  const { DomUtil, Point } = require('leaflet');

  if (data) {
    tiles.createTile = (coords) => {
      const tile = DomUtil.create('canvas', 'leaflet-tile');
      const ctx = tile.getContext('2d');
      const size = new Point(256, 256);
      const newCoords = `${coords.z}/${coords.x}/${coords.y}`;
      const currentTile = data?.tiles?.find(({ key }) => key === newCoords);

      tile.setAttribute('width', size.x);
      tile.setAttribute('height', size.y);

      if (currentTile) {
        const { fever, dry_cough, fatigue } = currentTile || {};

        const myChart = new Chart(ctx, {
          type: 'pie',
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
          },
        });
      }

      return tile;
    };
  }

  return tiles;
};

const drawMap = (setMapBounds, setGridLayer) => {
  const { Map, GridLayer, tileLayer } = require('leaflet');
  const map = new Map('map', { minZoom: 2, maxZoom: 13 }).setView([52.5, 6], 8);
  const tiles = new GridLayer();
  setGridLayer(tiles);

  tileLayer(
    'https://api.mapbox.com/styles/v1/gohike/ck8ewra7t0pmm1ippdeojwhs9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ29oaWtlIiwiYSI6ImNrOGV3bWhvbDAxMTczbW15c2w0c3BoZTMifQ.oNy4IXkFUIEvHtLxM8dV-w'
  ).addTo(map);

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

  return map;
};

export const renderCharts = async (map, data, gridLayer) => {
  createTiles(gridLayer, data);
  gridLayer.addTo(map);

  return map;
};

export default drawMap;
