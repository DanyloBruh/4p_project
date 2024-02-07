/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivateConfig } from '../Helper/axios.js';
import useRefreshToken from './useRefreshToken.js';

const useAxiosPrivateImages = () => {
  const refresh = useRefreshToken();
  const auth = useSelector((state) => state.auth.auth);
  useEffect(() => {
    const requestIntercept = axiosPrivateConfig.interceptors.request.use(
      async (config) => {
        console.log(config);
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accesToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateConfig.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivateConfig(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivateConfig.interceptors.request.eject(requestIntercept);
      axiosPrivateConfig.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivateConfig;
};

export default useAxiosPrivateImages;
