/* eslint-disable no-undef */
import axios from 'axios';

/* eslint-disable import/prefer-default-export */
const BASE_URL = 'http://localhost:3005';

function request(url, method, data) {
  const options = { method };

  try {
    switch (options.method) {
      case 'GET':
        return axios.get(`${BASE_URL}${url}`);

      case 'POST':
        return axios
          .post(`${BASE_URL}${url}`, data)
          .then((response) => response);

      case 'POSTCON':
        return axios
          .post(`${BASE_URL}${url}`, data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => response);

      case 'PATCH':
        return axios
          .patch(`${BASE_URL}${url}`, data)
          .then((response) => response);

      case 'PATCHCON':
        return axios
          .patch(`${BASE_URL}${url}`, data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => response);

      case 'DELETE':
        return axios.delete(`${BASE_URL}${url}`).then((response) => response);

      default:
        return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const client = {
  get: (url) => request(url, 'GET'),
  post: (url, data) => request(url, 'POST', data),
  postConfig: (url, data) => request(url, 'POSTCON', data),
  patch: (url, data) => request(url, 'PATCH', data),
  patchConfig: (url, data) => request(url, 'PATCHCON', data),
  delete: (url) => request(url, 'DELETE'),
};
