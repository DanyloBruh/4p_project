/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { useDispatch } from 'react-redux';
import { loginReducer } from '../redux/authSlice.js';
import useAxiosPrivate from './useAxiosPrivate.js';
import { logout } from '../Helper/requests.js';

const useLogout = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logoutHook = async () => {
    dispatch(loginReducer({}));

    try {
      const response = await logout(axiosPrivate);
    } catch (err) {
      console.error(err);
    }
  };

  return logoutHook;
};

export default useLogout;
