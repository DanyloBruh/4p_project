/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
// import axios from 'axios';
import axios from './axios.js';

function request(url, method, data) {
  const options = { method };

  try {
    switch (options.method) {
      case 'GET':
        return axios.get(url);

      case 'POST':
        return axios.post(url, data).then((response) => response);

      case 'PATCH':
        return axios.patch(url, data).then((response) => response);

      case 'DELETE':
        return axios.delete(url).then((response) => response);

      default:
        return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function requestPrivate(url, method, axiosPrivate, data) {
  const options = { method };
  try {
    switch (options.method) {
      case 'GET':
        return axiosPrivate.get(url);

      case 'POST':
        return axiosPrivate.post(url, data).then((response) => response);

      case 'POSTCON':
        return axiosPrivate
          .post(`${BASE_URL}${url}`, data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => response);

      case 'PATCH':
        return axiosPrivate.patch(url, data).then((response) => response);

      case 'PATCHCON':
        return axiosPrivate
          .patch(`${BASE_URL}${url}`, data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => response);

      case 'DELETE':
        return axiosPrivate.delete(url).then((response) => response);

      default:
        return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const client = {
  get: (url) => request(url, 'GET'),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'PATCH', data),
  delete: (url) => request(url, 'DELETE'),
};

export const clientPrivate = {
  get: (url, axiosPrivate) => requestPrivate(url, 'GET', axiosPrivate),
  post: (url, axiosPrivate, data) => requestPrivate(url, 'POST', axiosPrivate, data),
  postConfig: (url, axiosPrivate, data) => requestPrivate(url, 'POSTCON', axiosPrivate, data),
  patch: (url, axiosPrivate, data) => requestPrivate(url, 'PATCH', axiosPrivate, data),
  patchConfig: (url, axiosPrivate, data) => requestPrivate(url, 'PATCHCON', axiosPrivate, data),
  delete: (url, axiosPrivate) => requestPrivate(url, 'DELETE', axiosPrivate),
};
