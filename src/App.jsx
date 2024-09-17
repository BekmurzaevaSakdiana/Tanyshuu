import { useState } from "react";
import "./App.css";
import FirstAuth from "./pages/Auth/FirstAuth";
import SecondAuth from "./pages/Auth/SecondAuth";
import ThirdAuth from "./pages/Auth/ThirdAuth";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import SeventhAuth from "./pages/Auth/SeventhAuth";
import Auth from "./layouts/Auth";
import Main from "./layouts/Main";
import HomeMain from "./pages/Main/HomeMain";
import ProfileMain from "./pages/UserProfile/ProfileMain";
import Login from "./layouts/Login2";
import FirstLogin from "./pages/Login/FirstLogin2";
import FifthAuth from "./pages/Auth/FifthAuth";
import AllUsersProfile from "./pages/AllUsersAbout/AllUsersProfile";
import SixthAuth from "./pages/Auth/SixthAuth";
import SettingProfile from "./pages/UserProfile/SettingProfile";
import Request from "./pages/AllUsersAbout/Request";
import Frends from "./pages/AllUsersAbout/Frends";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}></Route>

      <Route path="/" element={<PrivateLayout />}>
        <Route path="auth" element={<Auth />}>
          <Route index element={<FirstAuth />} />
          <Route path="2" element={<SecondAuth />} />
          <Route path="3" element={<ThirdAuth />} />
          <Route path="4" element={<FifthAuth />} />
          <Route path="5" element={<SeventhAuth />} />
          <Route path="6" element={<SixthAuth />} />
        </Route>

        <Route path="login" element={<Login />}>
          <Route index element={<FirstLogin />} />
        </Route>

        <Route path="main" element={<Main />}>
          <Route index element={<HomeMain />} />
          <Route path="profile" element={<ProfileMain />} />
          <Route path="settingProfile" element={<SettingProfile />} />
          <Route path="allUsersProfile" element={<AllUsersProfile />}>
            <Route index element={<Request />} />
            <Route path="requestResponce" element={<Frends />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
