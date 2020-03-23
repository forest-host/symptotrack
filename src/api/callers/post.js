import Api from '../api';

/* === === === === === === === === *\
|| Post caller
\* === === === === === === === === */

/**
 * @param {*} url
 * @param {*} args
 * @param {*} conf
 * @returns
 */
export default function post(ctx, url, args, conf) {
  return Api(ctx)
    .post(url, args, conf)
    .then(({ status, data }) => {
      if (status < 200 || status >= 300) throw Error(data);
      return data;
    })
    .catch((error) => error.response);
}
