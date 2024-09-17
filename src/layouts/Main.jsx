import React from "react";
import { Outlet } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import FooterMain from "../components/FooterMain";
import ContextProvider from "../context/profileContext";

export default function Main() {
  return (
    <>
      <ContextProvider>
        <HeaderMain />
        <Outlet />
        <FooterMain />
      </ContextProvider>
    </>
  )
}
