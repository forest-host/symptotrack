import Api from '../api';

/* === === === === === === === === *\
|| Destroy caller
\* === === === === === === === === */

/**
 * @param {*} url
 * @param {*} conf
 * @returns
 */
export default function destroy(ctx, url, conf) {
  return Api(ctx)
    .delete(url, conf)
    .then(({ status, data }) => {
      if (status < 200 || status >= 300) throw Error(data);
      return data;
    })
    .catch((error) => error.response);
}
