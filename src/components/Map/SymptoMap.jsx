import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid';

// Utils
import { get } from '../../api/callers';

// Components
import MarkerIcon from './MarkerIcon';

// Styling
import SMap from './styles';

const SymptoMap = ({ coordinates }) => {
  // Leaflet
  const L = require('leaflet');
  const { Map, Marker, TileLayer } = require('react-leaflet');

  const mapRef = useRef(null);
  const [data, setData] = useState(null);

  const getData = async ({ z, top, right, bottom, left }) => {
    await get('data/spots', {
      params: {
        z: parseFloat(z),
        top: parseFloat(top),
        right: parseFloat(right),
        bottom: parseFloat(bottom),
        left: parseFloat(left),
      },
    }).then((resp) => {
      setData(resp);
    });
  };

  useEffect(() => {
    getData(coordinates);
  }, []);

  const onViewportChanged = ({ zoom = 8 }) => {
    const { _southWest, _northEast } = mapRef?.current?.leafletElement.getBounds();

    Router.push(
      `/map?test=true&z=${zoom}&top=${_northEast?.lat}&right=${_northEast?.lng}&bottom=${_southWest?.lat}&left=${_southWest?.lng}`,
      `/map?test=true&z=${zoom}&top=${_northEast?.lat}&right=${_northEast?.lng}&bottom=${_southWest?.lat}&left=${_southWest?.lng}`,
      { shallow: true }
    );

    getData({
      z: zoom,
      top: _northEast?.lat,
      right: _northEast?.lng,
      bottom: _southWest?.lat,
      left: _southWest?.lng,
    });
  };

  const createIcon = (details) =>
    L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToStaticMarkup(<MarkerIcon {...details} />),
    });

  const calculateCenter = ({ top, right, bottom, left }) => {
    const y = (parseFloat(bottom) + parseFloat(top)) / 2;
    const x = (parseFloat(right) + parseFloat(left)) / 2;

    return [y, x];
  };

  return (
    <SMap width={1}>
      <Map
        center={calculateCenter(coordinates)}
        maxZoom={18}
        minZoom={2}
        zoom={coordinates.z}
        ref={mapRef}
        onViewportChanged={(e) => onViewportChanged(e)}
      >
        <TileLayer url="https://api.mapbox.com/styles/v1/gohike/ck8ewra7t0pmm1ippdeojwhs9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ29oaWtlIiwiYSI6ImNrOGV3bWhvbDAxMTczbW15c2w0c3BoZTMifQ.oNy4IXkFUIEvHtLxM8dV-w" />

        {data?.spots?.map(({ location, ...spot }) => (
          <Marker
            key={uuid()}
            position={[location.lat, location.lon]}
            icon={createIcon({ total: data.hits, ...spot })}
          />
        ))}
      </Map>
    </SMap>
  );
};

SymptoMap.propTypes = {
  coordinates: PropTypes.shape({
    z: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default SymptoMap;
