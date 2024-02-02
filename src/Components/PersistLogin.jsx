/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRefreshToken from '../Hooks/useRefreshToken';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  // const { auth, persist } = useAuth();
  const auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return isLoading ? <p>lol</p> : <Outlet />;
  // {!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
}

export default PersistLogin;
