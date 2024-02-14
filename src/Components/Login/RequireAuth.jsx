/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function RequireAuth({ allowedRoles }) {
  const auth = useSelector((state) => state.auth.auth);
  const location = useLocation();
  return allowedRoles?.includes(auth.user?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="admin/*" replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
