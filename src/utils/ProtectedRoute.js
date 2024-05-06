import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useAuthContext();

  return user === undefined || user === null ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
}

export default ProtectedRoute;
