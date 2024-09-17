import React, { useContext, useEffect, useRef, useState } from "react";
import PublicModal from "../../../components/PublicModal";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import API from "../../../axios";
import { ProfileContext } from "../../../context/profileContext";

export default function Badoo() {
  const [contextProfile, setContextProfile] = useContext(ProfileContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openPublicModal, setOpenPublicModal] = useState(false);
  const [animateDirection, setAnimateDirection] = useState("");
  const [myProfile, setMyProfile] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const animationRef = useRef(null);
  const [data, setData] = useState(null);

  const handleOpenPublicModal = () => {
    setOpenPublicModal((prev) => !prev);
  };

  const handleClosePublicModal = () => {
    setOpenPublicModal((prev) => !prev);
  };

  const handleRedCrossClick = () => {
    if (data.length < 1) return;
    setAnimateDirection("left");
    // removeUser();
  };

  const handleGreenPlusClick = () => {
    if (data.length < 1) return;
    setAnimateDirection("right");
    sendFriendsRequest()
    // removeUser();
  };

  const sendFriendsRequest = async () => {
    try {
      await API.post("/friend-requests/send_request/", {
        to_user: myProfile.id,
        from_user: contextProfile.id,
      });
    } catch (e) {}
  };

  const removeUser = () => {
    setData((prev) => {
      let newDAta = prev.filter(({ id }) => myProfile?.id != id);
      setMyProfile(newDAta[0]);
      return newDAta;
    });
    setTimeout(() => setAnimationKey((prev) => prev + 1));
    setAnimateDirection("");
  };

  useEffect(() => {
    setLoading(true);
    API.get("/auth/?" + searchParams.toString(), {})
      .then((res) => {
        setMyProfile(res.data[0]);
        setData(res.data);
      })
      .catch((err) => {
        console.error(`Пиздец ошибка:`, err);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <section className="swipe pt-20">
      <div className="title-info">
        <h2 className="text-white font-mont text-3xl text-center">Выбирайте</h2>

        <div className="additional-info mt-12 mb-12">
          <p className="text-white font-mont text-center text-base">
            Плюс- <span className="text-blue-400">Понравилось</span>
          </p>
          <p className="text-white font-mont text-center text-base mt-4">
            Крест- <span className="text-red-500">Непонравилось</span>
          </p>
        </div>
      </div>

      <div className="container">
        <div className="swipeDragnDrop relative gap-4 px-5 py-4 max-sm:px-0 flex items-center justify-evenly ">
          <div
            className="red-cross__strelka transition-all duration-300 ease-linear delay-200 cursor-pointer"
            onClick={handleRedCrossClick}
          >
            <img
              className=" rounded-full opacity-75 hover:opacity-100 "
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
              src="/svg/red-cross.png"
              alt=""
            />
          </div>

          <div
            ref={animationRef}
            key={animationKey}
            onAnimationEnd={removeUser}
            className={`left-right__sides flex flex-col items-center max-md:flex-col max-md:items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 max-w-lg w-full max-lg:max-w-md max-lg:py-8 max-sm:max-w-sm  py-12 rounded-lg ${
              animateDirection === "left"
                ? "animate-moveLeft"
                : animateDirection === "right"
                ? "animate-moveRight"
                : ""
            }`}
            style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
          >
            <div className="left__side">
              <div className="img-profile max-w-md border-4 border-white shadow-lg rounded-lg">
                <img
                  className="max-w-96 h-60 max-md:max-w-72 max-lg:max-h-44 max-sm:max-w-66 max-sm:h-32"
                  src={myProfile?.profile ?? "/ponchick.jpg"}
                  alt="Profile"
                />
              </div>
            </div>

            <div className="right-side">
              <div className="info text-center text-white">
                <p className="text-3xl mt-5 font-bold font-mont text-center max-md:text-center">
                  {loading && "Загрузка..."}
                  {myProfile ? myProfile?.username : null}
                  {!(loading || myProfile) ? "Нету данных!" : null}
                </p>

                <div onClick={handleOpenPublicModal} className="btn-modal mt-5">
                  <button className="transition-all duration-100 ease-linear delay-100 bg-black hover:bg-gradient-to-r hover:from-purple-900 hover:to-pink-800 font-mont px-4 py-2 rounded-lg  max-sm:text-sm max-sm:px-2 max-sm:py-1">
                    <span className="hidden md:inline">Нажмите чтобы </span>{" "}
                    просмотреть публикации
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="greenPlus__strelkaRight  transition-all duration-300 ease-linear delay-200 cursor-pointer"
            onClick={handleGreenPlusClick}
          >
            <img
              className="opacity-75 hover:opacity-100 rounded-full"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
              src="/svg/plus.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {openPublicModal && (
        <PublicModal handleClosePublicModal={handleClosePublicModal} />
      )}
    </section>
  );
}
