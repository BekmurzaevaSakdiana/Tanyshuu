import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        required
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

export default function FifthAuth() {
  const navigate = useNavigate();
  // const goBack = () => navigate(-1);

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");

    try {
      const response = await API.post("/accounts/my_characteristic/", data);

      console.log("response:", response.data);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/auth/5");
      });
    } catch (error) {
      if (error.response) {
        setError(
          "Ошибка" + (error.response.data.message || "Попробуйте еще раз")
        );
      } else if (error.request) {
        console.log("Error request:", error.request);
        setError("Ошибка запроса:Проверьте соединение с интернетом");
      } else {
        console.error("General error:", error.message);
        setError("Ошибка:" + error.message);
      }
    }
  };

  return (
    <section className="secondAuth bg-cover w-full min-h-screen flex justify-center items-center relative">
      <div className="container mx-auto">
        {/* <div onClick={goBack} className="go-back absolute top-7 left-6">
          <img src="/svg/back.png" alt="" />
        </div> */}
        <div className="firstAuth-items pt-12">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center">
              <div className="title">
                <h1 className="font-mont font-bold text-2xl text-white">
                  Напишите свою характеристику
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
                  type="number"
                  name="height"
                  placeholder="Рост"
                  required
                  maxLength="3"
                />
              </div>

              <div className="input-container max-w-80 bg-none text-start pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl  outline-none px-3 py-2"
                  type="number"
                  name="weight"
                  placeholder="Вес"
                  required
                  maxLength="3"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Цвет глаз?"}
                  arr={["голубые", "зеленые", "карие"]}
                  name="eye_color"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Цвет кожи:"}
                  arr={["белый", "коричневый", "черный"]}
                  name="skin_color"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="number"
                  name="age"
                  placeholder="Возраст"
                  maxLength="3"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="hair_color"
                  placeholder="Цвет волос"
                  maxLength="10"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="body_type"
                  placeholder="Тип фигуры"
                  maxLength="10"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="education"
                  placeholder="Обучение"
                  maxLength="15"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="occupation"
                  placeholder="Род занятий"
                  maxLength="15"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="city"
                  placeholder="Город"
                  maxLength="15"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-white font-mont font-xl outline-none px-3 py-2"
                  type="text"
                  name="interests"
                  placeholder="Интересы"
                  maxLength="15"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <CustomSelect
                  title={"Знак зодиака?"}
                  arr={[
                    "Овен",
                    "Телец",
                    "Близнецы",
                    "Рак",
                    "Лев",
                    "Дева",
                    "Весы",
                    "Скорпион",
                    "Стрелец",
                    "Козерог",
                    "Водолей",
                    "Рыбы",
                  ]}
                  name="zodiac_sign"
                />
              </div>

              <div className="input-container max-w-72 pt-5">
                <input
                  className="w-full bg-transparent border-b text-sm text-white font-mont outline-none px-3 py-2"
                  type="text"
                  name="favorite_movies_books"
                  placeholder="Любимые фильмы или книги"
                  maxLength="15"
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
    </section>
  );
}
