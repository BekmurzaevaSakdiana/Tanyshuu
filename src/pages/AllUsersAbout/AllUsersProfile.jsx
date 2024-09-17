import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AllUsersProfile() {
  const navigate = useNavigate();
  const goBack = () => navigate("/main");
  const { pathname } = useLocation();

  return (
    <>
      <header className="px-5 py-12 bg-purple-600">
        <div className="container relative ">
          <div className="header-request__items items-center flex ">
            <div
              onClick={goBack}
              className="max-w-10 sm:max-w-sm back-svg69 flex-[0_1_150px]   left-32 top-0 w-10 sm:w-5 xs:w-4"
            >
              <img src="/svg/back.png" alt="" />
            </div>

            <nav className=" w-full flex-1">
              <ul className="flex w-full items-center justify-around max-sm:flex-col ">
                <li>
                  <NavLink
                    to="/main/allUsersProfile"
                    className={({ isActive }) =>
                      `font-mont text-white max-w-20 w-full ${
                        isActive && !pathname.split('/').at(-1).includes('requestResponce') ? "active" : ""
                      }`
                    }
                  >
                    Запросы
                  </NavLink>
                </li>
                <li className="max-sm:mt-10">
                  <NavLink
                    to="requestResponce"
                    className={({ isActive }) =>
                      `font-mont text-white max-w-20 w-full ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    Друзья
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
