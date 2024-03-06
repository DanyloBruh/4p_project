import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.4rompeople.com:99',
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: 'https://www.4rompeople.com:99',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const axiosPrivateConfig = axios.create({
  baseURL: 'https://www.4rompeople.com:99',
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});
