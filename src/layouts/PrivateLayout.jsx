import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateLayout() {
  //   if ("asdsad") {
  //     return Navigate("/auth");
  //   }
  return (
    <>
    <Outlet />
    </>
  )
}
