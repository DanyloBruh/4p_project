/* eslint-disable import/extensions */
import { useDispatch } from 'react-redux';
import axios from '../Helper/axios.js';
import { loginReducer } from '../redux/authSlice.js';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.get('/refresh');
      dispatch(loginReducer(response.data));
      return response.data.accesToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
