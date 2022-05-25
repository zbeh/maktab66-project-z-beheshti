import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const state = useSelector((state) => state.admin.isLogin);
  //  localStorage.removeItem('token')
  const token = localStorage.getItem("token");
  console.log(state);
  const location = useLocation();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
