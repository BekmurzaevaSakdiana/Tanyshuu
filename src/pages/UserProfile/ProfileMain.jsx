import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoosePostModal from "../../components/ChoosePostModal";
import API from "../../axios";

export default function ProfileMain() {
  const [myProfile, setMyProfile] = useState(null);
  const navigate = useNavigate();
  const goToSettings = () => navigate("/main/settingProfile");
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    API.get("/accounts/my_profile/")
      .then((res) => {
        setMyProfile(res.data);
      })
      .catch((err) => {
        console.error(`Пиздец ошибка:`, err);
      });
  }, []);

  const handleOpenChooseModal = () => {
    setOpenChooseModal((prev) => !prev);
  };

  const handleCloseChooseModal = () => {
    setOpenChooseModal((prev) => !prev);
  };

  if (!myProfile) {
    return (
      <div className="img flex items-center justify-center min-h-screen">
        <img src="/svg/loading.gif" alt="Loading" />
      </div>
    );
  }

  return (
    <div className="profileMain pt-12 pb-12 max-sm:pb-96">
      <div className="container ">
        <div className="main-items">
          <div className="main-items__top border-b border-gray-500 pb-4">
            <div className="img-info flex items-center justify-evenly max-lg:flex-wrap max-lg:items-end">
              <div className="img__profileThis max-w-40 w-full text-center">
                <img
                  className="w-40 h-40 rounded-full object-cover border-2 border-gray-500"
                  src={myProfile?.profile ?? "/ponchick.jpg"}
                  alt="Profile"
                />
              </div>

              <div className="info-settings gap-12 flex items-center max-md:flex-col max-lg:gap-4 max-lg:mt-5 ">
                <div className="title-info">
                  <p className="text-white font-mont max-lg:text-sm">
                    {myProfile.gender}
                  </p>
                </div>

                <div className="title-info">
                  <p className="text-white font-mont max-lg:text-sm">
                    {myProfile.username}
                  </p>
                </div>

                <div className="title-info">
                  <p className="text-white font-mont max-lg:text-sm">
                    {myProfile.status}
                  </p>
                </div>

                <div className="btn-settings flex items-center justify-center">
                  <button
                    onClick={goToSettings}
                    className=" max-lg:text-sm  flex items-center gap-3 text-white text-sm font-normal font-mont bg-pink-600 px-2 py-1 rounded-lg"
                  >
                    Редактировать профиль
                    <div className="settings w-7">
                      <img src="/svg/settings.png" alt="Settings" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-items__bottom h-screen max-md:pb-60 mt-12">
          <div className="toggleTitle ">
            <div className="allUserPosts">
              <div className="images flex justify-center gap-12 items-center max-md:flex-wrap">
                {myProfile?.images?.map((item) => (
                  <div key={item.id} className="">
                    <img
                      className="max-w-[200px] w-full aspect-[3/4] object-cover object-center"
                      src={item.image}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            {myProfile?.images.length < 3 ? (
              <div
                onClick={handleOpenChooseModal}
                className="btn w-12 h-12 mx-auto mt-12 rounded-full"
              >
                <button className=" active:text-white transition-all duration-400 ease-in-out delay-100 border-white border font-mont text-white w-12 h-12 rounded-full text-3xl ">
                  +
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {openChooseModal && (
        <ChoosePostModal
          userId={myProfile.id}
          handleCloseChooseModal={handleCloseChooseModal}
        />
      )}
    </div>
  );
}
