import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../axios";

export default function ThirdAuth() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting code:", code);
      const response = await API.post(
        "/auth/confirm-email/",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/auth/4");
      } else {
        setError("Неверный код подтверждения");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Ошибка");
    }
  };

  return (
    <section className="thirdAuth bg-cover w-full h-screen flex justify-center relative">
      <div className="container mx-auto">
        <div className="firstAuth-items translate-y-[160px]">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center">
              <div className="title">
                <h1 className="font-mont font-bold text-2xl text-white">
                  Введите код, который вам отправили в GMAIL
                </h1>
              </div>
            </div>
            <div className="subTitle mt-5">
              <p className="font-mont text-white text-base">
                Напишите точный код
              </p>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="btns mt-12 w-60 text-center"
            >
              <div className="input-container max-w-60 border-b bg-none">
                <input
                  className="w-full text-white font-mont outline-none bg-transparent px-3 py-2"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Введите код"
                />
              </div>

              {error && <p className="mt-5 text-red-600 font-mont">{error}</p>}

              <div className="button1 mt-10">
                <button className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 w-full text-white">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
