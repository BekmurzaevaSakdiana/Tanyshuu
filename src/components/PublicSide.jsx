import React from "react";
import { useNavigate } from "react-router-dom";

export default function PublicLayout() {
  const navigate = useNavigate();
  const goToAuth = () => navigate("/auth");
  return (
    <section className="public  bg-cover w-full min-h-screen flex justify-center  pt-[100px] pb-16">
      <div className="container mx-auto ">
        <div className="firstAuth-items">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center ">
              <div className="logo max-w-12 w-full ">
                <img src="/svg/tinder-logo2.png" alt="" />
              </div>

              <div className="title ">
                <h1 className="font-mont font-bold text-3xl text-white">
                  TANYSHUU
                </h1>
              </div>
            </div>
            <div className="subTitle mt-5 ">
              <p className="font-mont text-white text-md ">
                Сайт для знакомств
              </p>
            </div>
            <div className="main-title mt-12 px-5">
              <p className="text-white max-w-[774px] w-full mx-auto text-xl font-mont max-md:max-w-[410px] max-md:text-base">
                Этот сайт был создан с большой любовью и вниманием к деталям:
                FrontEnd by{" "}
                <span className="text-customColor font-bold">Sakdiana</span>{" "}
                <br />
                BackEnd by{" "}
                <span className="text-customBlue font-bold">Akmaanai</span>
              </p>

              <p className="text-white text-lg font-mont mt-12 max-w-[764px] w-full mx-auto  max-md:text-base  max-md:max-w-[500px ]">
                Мы постоянно обновляем контент, чтобы он был актуальным и
                интересным для наших пользователей. Добро пожаловать и приятного
                времяпровождения! <br />
              </p>

              <p className="text-white text-lg font-mont mt-12 max-w-[764px] w-full mx-auto max-md:text-base">
                Если хотите продолжить действие нажмите на кнопку{" "}
                <span>Далее</span>
              </p>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center  justify-center">
            <div className="btns mt-12 w-60 text-center  ">
              <div
                onClick={goToAuth}
                className="button1 mt-5 flex items-center justify-center gap-5 font-mont bg-ShadeOfPink rounded-lg px-3 py-2 w-full  text-white "
              >
                <button className="text-white">Далее</button>

                <div className="img-arrow w-8    ">
                  <img src="/svg/arrow.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
