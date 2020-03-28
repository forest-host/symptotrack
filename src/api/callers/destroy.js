import Api from '../api';

/* === === === === === === === === *\
|| Destroy caller
\* === === === === === === === === */

/**
 * @param {*} url
 * @param {*} conf
 * @returns
 */
export default function destroy(url, conf) {
  return Api()
    .delete(url, conf)
    .then(({ status, data }) => {
      if (status < 200 || status >= 300) throw Error(data);
      return data;
    })
    .catch((error) => error.response);
}
