import Api from '../api';

/* === === === === === === === === *\
|| Get caller
\* === === === === === === === === */

/**
 * @param {*} url
 * @param {*} conf
 * @param {boolean} [getHeaders=false]
 * @returns
 */
export default function get(ctx, url, args, conf, getHeaders = false) {
  return Api(ctx)
    .get(url, args, conf)
    .then(({ status, data, headers }) => {
      if (status < 200 || status >= 300) throw Error(data);

      if (getHeaders) {
        return { data, headers };
      }

      return data;
    })
    .catch((error) => error.data);
}
