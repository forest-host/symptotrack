import axios from 'axios';
import getConfig from 'next/config';
import mock from './mock';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL = 'https://api.symptotrack.org/v1/' } = publicRuntimeConfig;
const dev = process.env.NODE_ENV !== 'production';

mock(dev);

/**
 * Api constructor
 * @type {Axios.create}
 */
const Api = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  return api;
};

export default Api;
