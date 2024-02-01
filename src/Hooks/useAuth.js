/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider.jsx';

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  console.log(useContext(AuthContext));
  // const auth = useSelector((state) => state.auth.auth);
  useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
