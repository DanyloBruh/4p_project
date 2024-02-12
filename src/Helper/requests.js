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

export const getMainBlogs = async () => {
  const { data } = await client.get('/blogFirst/');
  return data;
};

export const getBlogById = async (id) => {
  const { data } = await client.get(`/blog/${id}`);
  return data;
};

export const getRecipeById = async (id) => {
  const { data } = await client.get(`/instruction/${id}`);
  return data;
};

export const login = async (postData) => {
  const { data } = await client.post('/login', postData);
  return data;
};

export const orderComplite = async (postData) => {
  const { data } = await client.post('/order', postData);
  return data;
};

export const logout = async (axiosPrivate) => {
  const { data } = await clientPrivate.post('/logout', axiosPrivate);
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
  const { data } = await clientPrivate.post(
    `/${category}/`,
    axiosPrivate,
    response,
  );
  return data;
};

export const postDataConfig = async (category, axiosPrivate, response) => {
  const { data } = await clientPrivate.postConfig(
    `/${category}/`,
    axiosPrivate,
    response,
  );
  return data;
};

export const deleteData = async (category, id, axiosPrivate) => {
  const { data } = await clientPrivate.delete(
    `/${category}/${id}/`,
    axiosPrivate,
  );
  return data;
};

export const editData = async (category, id, axiosPrivate, response) => {
  const { data } = await clientPrivate.patch(
    `/${category}/${id}/`,
    axiosPrivate,
    response,
  );
  return data;
};

export const editDataConfig = async (category, id, axiosPrivate, response) => {
  const { data } = await clientPrivate.patchConfig(
    `/${category}/${id}/`,
    axiosPrivate,
    response,
  );
  return data;
};
