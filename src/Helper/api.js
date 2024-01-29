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
    console.error(error);
    return null;
  }
}

export const client = {
  get: (url) => request(url, 'GET'),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'PATCH', data),
  delete: (url) => request(url, 'DELETE'),
};
