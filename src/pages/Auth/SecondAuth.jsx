import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // добавьте этот импорт
import API from "../../axios";

const CustomSelect = ({ arr, title, name }) => {
  const [IsActive, setIsActive] = useState(false);
  const [AtiveSelect, setAtiveSelect] = useState("");
  const selectRef = useRef(null);

  const handleSelect = (item) => {
    setAtiveSelect(item);
    setIsActive(false);
  };

  return (
    <div className={`text-left ${IsActive ? "" : "border-b border-[#9ca3af]"}`}>
      <input
        name={name}
        value={AtiveSelect}
        className="invisible absolute top-0 left-0"
        type="text"
        readOnly
      />
      <div className="">
        <span
          onClick={() => setIsActive((p) => !p)}
          className="text-[#9ca3af] flex items-center justify-between px-3 py-2 "
        >
          {AtiveSelect ? AtiveSelect : title}
          <span
            className={`${
              IsActive ? "rotate-[-90deg]" : "rotate-[90deg]"
            } transition-[.5s] `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#9ca3af"
            >
              <path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" />
            </svg>
          </span>
        </span>
        <div
          ref={selectRef}
          className={`${
            IsActive ? "visible max-h-[1000px]" : "invisible max-h-0 "
          } flex  flex-col transition-[.5s] border border-[#9ca3af] rounded-b-lg overflow-y-hidden`}
        >
          {arr.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setIsActive(!true);
                handleSelect(item);
              }}
              className={`text-white ${
                i + 1 !== arr.length ? "border-b" : ""
              } px-3 py-2 transition-[0] text-[#9ca3af] hover:!text-black hover:!bg-white`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SecondAuth() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [checkPass, setCheckPass] = useState("");
  const [confirmCheckPass, setConfirmCheckPass] = useState("");
  const [passError, setPassError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (checkPass !== confirmCheckPass) {
      setPassError("Пароли не совпадают");
      return;
    }

    setPassError(""); // Очистка предыдущих ошибок

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Отправка данных на сервер
      const response = await API.post(
        "/auth/register/",
        data
      );
      console.log("response:", response.data);
      
      // Успешная регистрация
      setIsSuccess(true);

      // Перенаправление через 2 секунды
      setTimeout(() => {
        navigate("/auth/3");
      }, 2000);

    } catch (error) {
      // Обработка ошибок
      if (error.response) {
        setPassError("Ошибка сервера: " + error.response.data.message || "Попробуйте еще раз");
      } else if (error.request) {
        console.error("Error request:", error.request);
        setPassError("Ошибка запроса: Проверьте соединение с интернетом");
      } else {
        console.error("General error:", error.message);
        setPassError("Ошибка: " + error.message);
      }
    }
};


  return (
    <section className="secondAuth bg-cover w-full min-h-screen flex justify-center items-center relative">
      <div className="container mx-auto">
        <div onClick={goBack} className="go-back absolute top-7 left-6">
          <img src="/svg/back.png" alt="" />
        </div>
        <div className="firstAuth-items pt-12">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center">
              <div className="title">
                <h1 className="font-mont font-bold text-3xl text-white">
                  Регистрация
                </h1>
              </div>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="btns mt-10 w-3xl text-center"
            >
              <div className="input-container max-w-72 bg-none text-start flex items-center justify-center">
                <input
                  className="w-full bg-transparent border-b  outline-none px-3 py-2 text-white font-mont font-xl"
                  type="email"
                  name="email"
                  placeholder="Введите ваш gmail"
                  required
                />
              </div>

              <div className="input-container max-w-80 bg-none text-start pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl  outline-none px-3 py-2"
                  type="number"
                  name="phone_number"
                  placeholder="Номер телефона"
                  required
                />
              </div>

              <div className="input-container max-w-72 bg-none text-start pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="username"
                  placeholder="Ваш никНейм"
                  required
                />
              </div>

              <div className="input-container max-w-72 bg-none text-start pt-5 flex items-center justify-between border-b">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full bg-transparent  text-white font-mont font-xl outline-none px-3 py-2"
                  placeholder="Пароль"
                  name="password"
                  required
                  onChange={(e) => setCheckPass(e.target.value)}
                />

                <div
                  onClick={toggleVisibility}
                  className="icon-eye cursor-pointer pb-3"
                >
                  {passwordVisible ? (
                    <img className="w-7" src="/svg/openEye.png" alt="" />
                  ) : (
                    <img className="w-7" src="/svg/closedEye.png" alt="" />
                  )}
                </div>
              </div>

              <div className="input-container max-w-72 bg-none text-start pt-5 flex items-center justify-between border-b">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-full bg-transparent  text-white font-mont font-xl outline-none px-3 py-2"
                  placeholder="Повторите пароль"
                  name="confirmPassword"
                  required
                  onChange={(e) => setConfirmCheckPass(e.target.value)}
                />

                <div
                  onClick={toggleConfirmPasswordVisibility}
                  className="icon-eye cursor-pointer pb-3"
                >
                  {confirmPasswordVisible ? (
                    <img className="w-7" src="/svg/openEye.png" alt="" />
                  ) : (
                    <img className="w-7" src="/svg/closedEye.png" alt="" />
                  )}
                </div>
              </div>

              {passError && (
                <p className="text-red-500 text-start font-mont ">
                  {passError}
                </p>
              )}

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Ваш пол:"}
                  arr={["мужчина", "женщина", "предпочитаю не говорить"]}
                  name="gender"
                  required
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="date"
                  placeholder="Дата рождения"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Кого хотите видеть?"}
                  arr={["мужской", "женский", "всех"]}
                  name="preferred_gender"
                  required
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Статус?"}
                  arr={["свободен", "не свободен"]}
                  name="status"
                  required
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  placeholder="Напишите ник вашей инсты"
                  name="instagramnick"
                  required
                />
              </div>
              <div className="button1 mt-10">
                <button
                  type="submit"
                  className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 w-full text-white"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <img className="w-40" src="/svg/check.gif" alt="" />
        </div>
      )}
    </section>
  );
}
