/* eslint-disable import/extensions */
import { client, clientPrivate } from './api.js';

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

export const getDataByCategory = async (category, axiosPrivate) => {
  const { data } = await clientPrivate.get(`/${category}/`, axiosPrivate);
  return data;
};

export const getDataByCategoryId = async (category, id, axiosPrivate) => {
  const { data } = await clientPrivate.get(`/${category}/${id}/`, axiosPrivate);
  return data;
};

export const postData = async (category, axiosPrivate, response) => {
  await clientPrivate.post(`/${category}/`, axiosPrivate, response);
};

export const postDataConfig = async (category, axiosPrivate, response) => {
  await clientPrivate.postConfig(`/${category}/`, axiosPrivate, response);
};

export const deleteData = async (category, id, axiosPrivate) => {
  await clientPrivate.delete(`/${category}/${id}/`, axiosPrivate);
};

export const editData = async (category, id, axiosPrivate, response) => {
  await clientPrivate.patch(`/${category}/${id}/`, axiosPrivate, response);
};

export const editDataConfig = async (category, id, axiosPrivate, response) => {
  await clientPrivate.patchConfig(
    `/${category}/${id}/`,
    axiosPrivate,
    response,
  );
};
