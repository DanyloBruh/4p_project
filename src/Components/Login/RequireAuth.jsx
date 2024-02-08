import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const auth = useSelector((state) => state.auth.auth);
  const location = useLocation();

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  // role
  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : auth?.user ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
}

export default RequireAuth;
