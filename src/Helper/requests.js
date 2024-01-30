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

export const getAllUsers = async () => {
  const { data } = await client.get('/user/');
  return data;
};

export const getDataByCategory = async (category) => {
  const { data } = await client.get(`/${category}/`);
  return data;
};

export const getDataByCategoryId = async (category, id) => {
  const { data } = await client.get(`/${category}/${id}/`);
  return data;
};

export const postProduct = async () => {
  const { data } = await client.post('/product/');
  return data;
};

export const postData = async (category, response) => {
  await client.post(`/${category}/`, response);
};

export const postDataConfig = async (category, response) => {
  await client.postConfig(`/${category}/`, response);
};

export const deleteData = async (category, id) => {
  await client.delete(`/${category}/${id}/`);
};

export const editData = async (category, id, response) => {
  await client.patch(`/${category}/${id}/`, response);
};

export const editDataConfig = async (category, id, response) => {
  await client.patchConfig(`/${category}/${id}/`, response);
};
