import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../axios";

// Кастомный компонент Select
const CustomSelect = ({ arr, title, name, value }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeSelect, setActiveSelect] = useState(value ?? "");
  const selectRef = useRef(null);

  const handleSelect = (item) => {
    setActiveSelect(item);
    setIsActive(false);
  };

  return (
    <div className={`text-left ${isActive ? "" : "border-b border-[#9ca3af]"}`}>
      <input
        name={name}
        value={activeSelect}
        className="invisible absolute top-0 left-0"
        type="text"
        readOnly
      />
      <div>
        <span
          onClick={() => setIsActive((prev) => !prev)}
          className="text-[#9ca3af] flex items-center justify-between px-3 py-2"
        >
          {activeSelect ? activeSelect : title}
          <span
            className={`${
              isActive ? "rotate-[-90deg]" : "rotate-[90deg]"
            } transition-[.5s]`}
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
            isActive ? "visible max-h-[1000px]" : "invisible max-h-0"
          } flex flex-col transition-[.5s] border border-[#9ca3af] rounded-b-lg overflow-y-hidden`}
        >
          {arr.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelect(item)}
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


function logoutFunc() {
  localStorage.removeItem("token");
}


export default function SettingProfile() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [myProfile, setMyProfile] = useState({});
  const [myProfile2, setMyProfile2] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    API.get("/accounts/my_profile/")
      .then((res) => {
        setMyProfile(res.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, []);

  useEffect(() => {
    API.get("/accounts/my_characteristic/")
      .then((res) => {
        setMyProfile2(res.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, []);

  const updateUserFetch = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let [key, value] of Object.entries({ ...myProfile, ...myProfile2 }))
        !(!value || value == "null") ? formData.append(key, value) : null;
      if (selectedImage) {
        formData.set("profile", selectedImage);
      } else {
        formData.delete("profile", selectedImage);
      }
      for (let [key, value] of formData.entries())
        !value || value == "null" ? formData.delete(key) : null;
      const token = localStorage.getItem("token");
      formData.delete("images");
      const { data } = await API.patch("/accounts/my_profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log("Ошибка обновления профиля:", error.response.data);
    }
  };
  const updateUserFetch9 = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let [key, value] of Object.entries({ ...myProfile, ...myProfile2 }))
        !(!value || value == "null") ? formData.append(key, value) : null;
      if (selectedImage) {
        formData.set("profile", selectedImage);
      } else {
        formData.delete("profile", selectedImage);
      }
      for (let [key, value] of formData.entries())
        !value || value == "null" ? formData.delete(key) : null;
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        "https://akmaanai.pythonanywhere.com/api/accounts/my_characteristic/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log("Ошибка обновления профиля:", error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  if (!myProfile) {
    return (
      <div className="img flex items-center justify-center min-h-screen">
        <img src="/svg/loading.gif" alt="Loading" />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setMyProfile2((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profileMain py-12">
      <div className="container">
        <div className="setting flex items-start justify-center gap-10 px-4 max-md:flex-col ">
          <div className="setting-img w-full md:w-auto border-b md:border-r-2 md:border-b-0 border-gray-700 pb-5 md:pb-0 md:px-4">
            <div className="two-img flex items-start gap-4 relative">
              <img
                onClick={goBack}
                className="absolute top-[-30px] left-[-60px]"
                src="/svg/back.png"
                alt="Назад"
              />
              <div className="profile-img max-md:mx-auto ">
                <img
                  src={imagePreview ?? myProfile?.profile ?? "/ponchick.jpg"}
                  alt="Profile Preview"
                  className=" w-60  h-60 object-cover "
                />
              </div>
            </div>

            <div className="input-container mt-12 max-md:text-center">
              <label
                htmlFor="profileImage"
                className="bg-ShadeOfPink w-full md:w-auto px-4 py-2 rounded-lg text-white mt-6 cursor-pointer "
              >
                Изменить фото профиля
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="setting-info w-full max-h-[400px] overflow-y-auto md:flex-1 max-w-xl space-y-6">
            <form onSubmit={updateUserFetch}>
              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="number"
                  name="phone_number"
                  placeholder="Номер телефона"
                  required
                  value={myProfile?.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="date"
                  placeholder="Дата рождения"
                  value={myProfile?.birth_date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container ">
                <CustomSelect
                  title={"Ваш пол:"}
                  arr={["мужчина", "женщина", "предпочитаю не говорить"]}
                  name="gender"
                  required
                  value={myProfile?.gender}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container ">
                <CustomSelect
                  title={"Кого хотите видеть?"}
                  arr={["мужской", "женский", "всех"]}
                  name="preferred_gender"
                  required
                  value={myProfile?.preferred_gender}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container ">
                <CustomSelect
                  title={"Статус?"}
                  arr={["свободен", "не свободен"]}
                  name="status"
                  required
                  value={myProfile?.status}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container mb-12 ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  placeholder="Напишите ник вашей инсты"
                  name="instagramnick"
                  required
                  value={myProfile?.instagramnick}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="bg-ShadeOfPink px-4 py-2 rounded-lg text-white "
                >
                  Сохранить изменения
                </button>
              </div>
            </form>

            <form onSubmit={updateUserFetch9}>
              <div className="input-container">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="number"
                  name="height"
                  placeholder="Рост"
                  required
                  maxLength="3"
                  value={myProfile2?.height}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="number"
                  name="weight"
                  placeholder="Вес"
                  required
                  maxLength="3"
                  value={myProfile2?.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container ">
                <CustomSelect
                  title={"Цвет глаз?"}
                  arr={["голубые", "зеленые", "карие"]}
                  name="eye_color"
                  value={myProfile2?.eye_color}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <CustomSelect
                  title={"Цвет кожи:"}
                  arr={["белый", "коричневый", "черный"]}
                  name="skin_color"
                  value={myProfile2?.skin_color}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="number"
                  name="age"
                  placeholder="Возраст"
                  maxLength="3"
                  value={myProfile2?.age}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="hair_color"
                  placeholder="Цвет волос"
                  maxLength="10"
                  value={myProfile2?.hair_color}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="body_type"
                  placeholder="Тип фигуры"
                  maxLength="10"
                  value={myProfile2?.body_type}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="education"
                  placeholder="Обучение"
                  maxLength="15"
                  value={myProfile2?.education}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="occupation"
                  placeholder="Род занятий"
                  maxLength="15"
                  value={myProfile2?.occupation}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="city"
                  placeholder="Город"
                  maxLength="15"
                  value={myProfile2?.city}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="interests"
                  placeholder="Интересы"
                  maxLength="15"
                  value={myProfile2?.interests}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container">
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
                  value={myProfile2?.zodiac_sign}
                  onChange={handleChange2}
                />
              </div>

              <div className="input-container mb-12 ">
                <input
                  className="w-full bg-transparent border-b-2 border-gray-500 text-white font-mont text-lg outline-none px-3 py-2 focus:border-pink-500 transition-colors"
                  type="text"
                  name="favorite_movies_books"
                  placeholder="Любимые фильмы или книги"
                  maxLength="15"
                  value={myProfile2?.favorite_movies_books}
                  onChange={handleChange2}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-ShadeOfPink px-4 py-2 rounded-lg text-white "
                >
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="logout flex items-center justify-center gap-5 mt-20 opacity-65 hover:opacity-100"
          onClick={logoutFunc}
        >
          <img className="w-10" src="/svg/logout.png" alt="" />
          <p className="text-white font-mont">выйти</p>
        </div>
      </div>
    </div>
  );
}
