/* eslint-disable import/extensions */
import { useDispatch } from 'react-redux';
import axios from '../Helper/axios.js';
import { loginReducer } from '../redux/authSlice.js';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get('/refresh');
    dispatch(loginReducer(response.data));
    console.log(response.data);
    return response.data.accesToken;
  };
  return refresh;
};

export default useRefreshToken;
