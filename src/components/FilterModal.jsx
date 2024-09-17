import axios from "axios";
import React, { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CustomSelect = ({ arr, title, name, value, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);
  const selectRef = useRef(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onChange(item); // Передаем выбранное значение в родительский компонент
    setIsActive(false);
  };

  return (
    <div className={`text-left ${isActive ? "" : "border-b border-[#9ca3af]"}`}>
      <input
        name={name}
        value={selectedItem}
        className="invisible absolute top-0 left-0"
        type="text"
        readOnly
        required
      />
      <div>
        <span
          onClick={() => setIsActive((prev) => !prev)}
          className="text-black flex items-center justify-between px-3 py-2"
        >
          {selectedItem ? selectedItem : title}
          <span
            className={`transition-transform duration-500 ${
              isActive ? "rotate-[-90deg]" : "rotate-[90deg]"
            }`}
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
          } flex flex-col transition-all duration-500 border border-[#9ca3af] rounded-b-lg overflow-y-hidden`}
        >
          {arr.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelect(item)}
              className={`text-black ${
                i + 1 !== arr.length ? "border-b" : ""
              } px-3 py-2 text-[#9ca3af] hover:bg-ShadeOfPink`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterModal = ({ handleCloseModal }) => {
  const [mySearchParams, setSearchParams] = useSearchParams()
  const [myQuery, setQuery] = useState(Object.fromEntries(mySearchParams.entries()));


  const handleChange = (e) => {
    const {name, value} = e.target
    setQuery(prev => ({...prev, [name]: value}))

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchParams(myQuery)
    handleCloseModal()
    // Создание строки запроса
 

    // Выполнение GET-запроса
   
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-full">
        <div
          onClick={handleCloseModal}
          className="cross flex items-center justify-end cursor-pointer"
        >
          <img src="/svg/cross.png" alt="Close" />
        </div>
        <div className="filter-items">
          <div className="firstAuth-items pt-6">
            <div className="firstAuth-items__top text-center mb-6">
              <div className="logo-title flex items-end gap-5 justify-center">
                <div className="title">
                  <h1 className="font-mont font-bold text-base text-gray-900">
                    Напишите характеристику, людей которых вы хотите видеть
                  </h1>
                </div>
              </div>
            </div>
            <div className="firstAuth-items__bottom flex items-center justify-center">
              <form onSubmit={handleSubmit} className="btns w-full text-center">
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="number"
                    value={myQuery.height}
                    onChange={handleChange}
                    placeholder="Рост"
                    required
                    max="300"
                    name="height"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="number"
                    value={myQuery.weight}
                    onChange={handleChange}

                    placeholder="Вес"
                    required
                    max="300"
                    name="weight"
                  />
                </div>
                <div className="input-container mb-4">
                  <CustomSelect
                    title={"Цвет глаз?"}
                    arr={["голубые", "зеленые", "карие"]}
                    name="eye_color"
                    value={myQuery.eyeColor}
                    onChange={handleChange}

                  />
                </div>
                <div className="input-container mb-4">
                  <CustomSelect
                    title={"Цвет кожи:"}
                    arr={["белый", "коричневый", "черный"]}
                    name="skin_color"
                    value={myQuery.skinColor}
                    onChange={handleChange}

                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="number"
                    value={myQuery.age}
                    onChange={handleChange}

                    placeholder="Возраст"
                    max="150"
                    name="age"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.hairColor}
                    onChange={handleChange}

                    placeholder="Цвет волос"
                    maxLength="10"
                    name="hair_color"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.bodyType}
                    onChange={handleChange}

                    placeholder="Тип фигуры"
                    maxLength="10"
                    name="body_type"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.education}
                    onChange={handleChange}

                    placeholder="Образование"
                    maxLength="15"
                    name="education"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.occupation}
                    onChange={handleChange}

                    placeholder="Род занятий"
                    maxLength="15"
                    name="occupation"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.city}
                    onChange={handleChange}

                    placeholder="Город"
                    maxLength="15"
                    name="city"
                  />
                </div>
                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.interests}
                    onChange={handleChange}

                    placeholder="Интересы"
                    maxLength="15"
                    name="interests"
                  />
                </div>

                <div className="input-container mb-4">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                    type="text"
                    value={myQuery.favoriteMoviesBooks}
                    onChange={handleChange}

                    placeholder="Любимые фильмы или книги"
                    maxLength="15"
                    name="favorite_movies_books"
                  />
                </div>
                <div className="button1 mt-6">
                  <button
                    type="submit"
                    className="font-mont bg-pink-500 rounded-lg px-3 py-2 w-full text-white"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
