/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

function request(url, method, data) {
  const options = { method };

  try {
    switch (options.method) {
      case 'GET':
        return axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);

      case 'POST':
        return axios
          .post(`${process.env.BASE_URL}${url}`, data)
          .then((response) => response);

      case 'PATCH':
        return axios
          .patch(`${process.env.BASE_URL}${url}`, data)
          .then((response) => response);

      case 'DELETE':
        return axios.delete(`${process.env.BASE_URL}${url}`).then((response) => response);

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
