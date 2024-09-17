import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../axios";

export default function FirstLogin2() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [openEye, setOpenEye] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpenEye = () => {
    setOpenEye((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());


    try {
      const response = await API.post("/auth/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(
          "Ошибка сервера: " + error.response.data.message ||
            "Попробуйте еще раз"
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("Ошибка запроса: Проверьте соединение с интернетом");
      } else {
        console.error("General error:", error.message);
        setError("Ошибка: " + error.message);
      }
    }
  };

  return (
    <section className="thirdAuth bg-cover w-full h-screen flex justify-center relative">
      <div className="container">
        <div onClick={goBack} className="go-back absolute top-7 left-6">
          <img src="/svg/back.png" alt="" />
        </div>
        <div className="firstAuth-items translate-y-[160px]">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center">
              <div className="title">
                <h1 className="font-mont font-bold text-3xl text-white">
                  Вход
                </h1>
              </div>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="btns mt-12 w-60 text-center"
            >
              <div className="input-container max-w-60 bg-none">
                <input
                  name="username" // Добавляем имя для правильного сбора данных формы
                  className="w-full bg-transparent outline-none text-white font-mont border-b px-3 py-2"
                  type="text"
                  placeholder="Ваш nick"
                />
              </div>

              <div className="input-container max-w-60 bg-none mt-5 flex items-center border-b">
                <input
                  name="password" // Добавляем имя для правильного сбора данных формы
                  className="w-full bg-transparent outline-none text-white font-mont px-3 py-2"
                  type={openEye ? "password" : "text"}
                  placeholder="Ваш пароль"
                />

                <div onClick={handleOpenEye} className="eye pb-3">
                  {openEye ? (
                    <img src="/svg/closedEye.png" alt="" />
                  ) : (
                    <img src="/svg/openEye.png" alt="" />
                  )}
                </div>
              </div>

              <div className="button1 mt-5">
                <button
                  type="submit"
                  className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 w-full text-white"
                >
                  Отправить{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <img className="w-40" src="/svg/check.gif" alt="Success" />
        </div>
      )}
    </section>
  );
}
