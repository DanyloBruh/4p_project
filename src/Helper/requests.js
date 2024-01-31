/* eslint-disable import/extensions */
import { client } from './api.js';

export const getAllProducts = async () => {
  const { data } = await client.get('/product/');
  return data;
};

export const getAllInstractions = async () => {
  const { data } = await client.get('/instruction/');
  return data;
};

export const getAllBlogs = async () => {
  const { data } = await client.get('/blog/');
  return data;
};

export const login = async (postData) => {
  const { data } = await client.post('/login', postData);
  return data;
};
