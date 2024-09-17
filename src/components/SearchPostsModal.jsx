import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../axios";

export default function SearchPostsModal({ handleClosePostsModal }) {
  const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок
  const [myProfile, setMyProfile] = useState(null); // Состояние для хранения данных профиля

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Устанавливаем состояние загрузки
      setError(null); // Сбрасываем ошибки перед началом нового запроса
      try {
        const response = await API.get("/accounts/my_profile/");
        setMyProfile(response.data); // Сохраняем данные профиля в состояние
      } catch (err) {
        setError("Ошибка при загрузке профиля"); // Устанавливаем ошибку в случае неудачного запроса
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchProfile(); // Вызываем функцию для получения профиля
  }, []); // Пустой массив зависимостей означает, что эффект сработает только один раз после первого рендера

  if (loading) {
    return (
      <div className="img flex items-center justify-center min-h-screen">
        <img src="/svg/loading.gif" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>; // Отображаем сообщение об ошибке, если она произошла
  }

  if (!myProfile) {
    return null; // Если данные профиля отсутствуют, ничего не отображаем
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full mx-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto overflow-y-auto max-h-full px-12 py-12  ">
        <div
          onClick={handleClosePostsModal}
          className="cross flex items-center justify-end "
        >
          <img src="/svg/cross.png" alt="" />
        </div>

        <div className="allUserPosts">
          <div className="images flex justify-center flex-wrap gap-12 items-center max-md:flex-col">
            {myProfile?.images?.map((item) => (
              <div key={item.id} className="">
                <img
                  className="max-w-[200px] w-full aspect-[3/4] object-cover object-center"
                  src={item.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ImagesPublic = ({ images, handleClosePostsModal }) => {
  console.log(images);
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full mx-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto overflow-y-auto max-h-full px-12 py-12  ">
        <div
          onClick={handleClosePostsModal}
          className="cross flex items-center justify-end "
        >
          <img src="/svg/cross.png" alt="" />
        </div>

        <div className="allUserPosts">
          <div className="images flex justify-center flex-wrap gap-12 items-center max-md:flex-col">
            {images.length > 0 ? (
              images?.map((item) => (
                <div key={item.id} className="">
                  <img
                    className="max-w-[200px] w-full aspect-[3/4] object-cover object-center"
                    src={item.image}
                    alt="asd"
                  />
                </div>
              ))
            ) : (
              <h1>Пусто</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
