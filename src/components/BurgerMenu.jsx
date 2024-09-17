import React from "react";
import { useNavigate } from "react-router-dom";

export default function BurgerMenu({ closeBurgerModal }) {
    const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-85 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto overflow-y-auto">
        <div className="p-8 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-gray-800">Меню</h2>
          <button
            onClick={closeBurgerModal}
            className="text-gray-600 hover:text-gray-800 focus:outline-none font-mont"
          >
            <img src="/svg/cross.png" alt="close menu" />
          </button>
        </div>
        <nav className="p-8">
          <ul className="space-y-6 text-gray-700">
            <li>
              <button
                onClick={() => {
                  closeBurgerModal();
                  navigate("/main")
                }}
                className="w-full text-left text-lg font-medium hover:text-black focus:outline-none font-mont"
              >
                Домой 
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  closeBurgerModal();
                  navigate("profile")
                }}
                className="w-full text-left text-lg font-medium hover:text-black focus:outline-none font-mont"
              >
                Профиль
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  closeBurgerModal();
                  navigate("allUsersProfile")
                }}
                className="w-full text-left text-lg font-medium hover:text-black focus:outline-none font-mont"
              >
                Запросы и ответы
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  closeBurgerModal();
                //   {handleToggleModal}

                }}
                className="w-full text-left text-lg font-medium hover:text-black focus:outline-none font-mont"
              >
                Фильтрация
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
