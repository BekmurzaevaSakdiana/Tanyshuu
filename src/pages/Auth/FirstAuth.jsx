import React from "react";
import { useNavigate } from "react-router-dom";

export default function FirstAuth() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const myNav=()=>navigate('2')
  const toLogin=()=>navigate('/login')

  return (
    <section className="firstAuth  bg-cover w-full h-screen flex justify-center items-center relative ">
      <div className="container mx-auto">
        <div onClick={goBack} className="go-back absolute top-7 left-6">
          <img src="/svg/back.png" alt="" />
        </div>
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
              <p className="font-mont text-white text-xl ">
                Сайт для знакомств
              </p>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center  justify-center">
            <div   className="btns mt-12 w-60 text-center  ">
              <div onClick={myNav} className="button1">
                <button  className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 text-white w-full ">
                  Создать Аккаунт
                </button>
              </div>
              <div className="button1 mt-5">
                <button onClick={toLogin} className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 w-full  text-white ">
                  Вход{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
