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
export default function post(url, args, conf) {
  return Api()
    .post(url, args, conf)
    .then(({ status, data }) => {
      if (status < 200 || status >= 300) throw Error(data);
      return data;
    })
    .catch((error) => error.response);
}
