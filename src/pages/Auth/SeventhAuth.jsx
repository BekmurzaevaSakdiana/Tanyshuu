import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import API from "../../axios";

export default function SeventhAuth() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await API.get(
          "/hobbies/"
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    axiosData();
  }, []);

  const handleButtonClick = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Удаляем id, если он уже выбран
          : [...prevSelected, id] // Добавляем id, если его нет в списке
    );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (selectedItems.length === 0) {
      alert("Выберите хотя бы один пункт перед отправкой.");
      return;
    }
    try {
      await axios.patch(
        "https://akmaanai.pythonanywhere.com/api/accounts/my_characteristic/",
        { selectedItems },

        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      alert("Данные успешно отправлены!");
      navigate("/auth/6");
    } catch (error) {
      alert("Ошибка при отправке данных.");
    }
  };

  if (loading) {
    return (
      <div className="loading_container flex items-center justify-center h-full">
        <img src="/svg/loading.gif" alt="" />
      </div>
    );
  }

  return (
    <section className="thirdAuth bg-cover w-full min-h-screen flex justify-center items-start pb-10 relative">
      <div className="container mx-auto">
        <div className="firstAuth-items mt-16">
          <div className="firstAuth-items__top text-center">
            <div className="logo-title flex items-end gap-5 justify-center">
              <div className="title">
                <h1 className="font-mont font-bold text-2xl text-white">
                  Выберите, то что вам нравится
                </h1>
              </div>
            </div>
          </div>
          <div className="firstAuth-items__bottom flex items-center justify-center">
            <div className="btns max-w-[700px] text-center mt-16 px-4">
              <div className="btns-container gap-1 flex flex-wrap">
                {data.map((item) => (
                  <div className="btns" key={item.id}>
                    <button
                      onClick={() => handleButtonClick(item.id)}
                      className={`w-full px-3 py-1 rounded-3xl ${
                        selectedItems.includes(item.id)
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-500"
                      }`}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>

              <div className="button1 mt-12 px-4">
                <button
                  onClick={handleSubmit}
                  className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 max-w-96 w-full text-white"
                >
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
