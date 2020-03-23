import Api from '../api';

/* === === === === === === === === *\
|| Put caller
\* === === === === === === === === */

/**
 * @param {*} url
 * @param {*} args
 * @param {*} conf
 * @returns
 */
export default function put(ctx, url, args, conf) {
  return Api(ctx)
    .put(url, args, conf)
    .then(({ status, data }) => {
      if (status < 200 || status >= 300) throw Error(data);
      return data;
    })
    .catch((error) => error.response);
}
