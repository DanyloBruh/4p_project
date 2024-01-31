/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../Helper/axios.js';
import useRefreshToken from './useRefreshToken.js';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector((state) => state.auth.auth);
  console.log(auth?.accessToken);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
