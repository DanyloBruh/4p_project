/* eslint-disable import/extensions */
import { client } from './api.js';

export const getAllProducts = async () => {
  const { data } = await client.get('/product/');
  return data;
};

export const getAllInstractions = async () => {
  const res = await client.get('/instraction/');
  return res;
};

export const getAllBlogs = async () => {
  const res = await client.get('/blog/');
  return res;
};
