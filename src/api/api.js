import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL = 'https://api.symptotrack.org/v1/' } = publicRuntimeConfig;

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
