import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../axios";

export default function SixthAuth() {
  const [selectedFile, setSelectedFile] = useState(null); 
  // Хранит выбранный пользователем файл изображения.
  const [previewImg, setPreviewImg] = useState(null); 
  // Хранит URL-адрес для предварительного просмотра выбранного изображения.
  const [success, setSuccess] = useState(false);
  // Хранит состояние успеха загрузки.

  const navigate = useNavigate();

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    // Получаем первый выбранный файл.
    if (file) {
      setSelectedFile(file); 
      // Сохраняем выбранный файл в состоянии.
      const reader = new FileReader();
      // Создаем объект для чтения файла и конвертации его в формат base64 для отображения.
      reader.onloadend = () => {
        setPreviewImg(reader.result); 
      };

      // Когда файл прочитан, устанавливаем base64-кодированное изображение в previewImg.
      reader.readAsDataURL(file);
    }
  };

  //  Функция, которая вызывается при выборе файла пользователем

  const handleSubmit = async () => {
    if (!selectedFile) return;
    // Проверяет, был ли выбран файл 

    const formData = new FormData();
    // чтобы отправить файл на сервер.
    formData.append("profile", selectedFile); 
    // Добавляет файл в FormData с ключом "profile".

    try {
      const res = await API.patch(
        "/accounts/my_profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setSuccess(true);
      navigate("/main");
    } catch (error) {
      console.error(error.message || error);
    }
  };

  // Функция, вызываемая при нажатии кнопки "Отправить

  return (
    <section className="firstAuth bg-cover bg-center w-full h-screen relative">
      <div className="container mx-auto flex flex-col pt-20 h-full">
        <div className="firstAuth-items text-center">
          <div className="title mb-8">
            <h1 className="font-mont font-bold text-2xl text-white">
              Выберите фото профиля
            </h1>
          </div>

          <div className="square h-[12rem] w-[12rem] bg-gray-400 rounded-full flex items-center justify-center mx-auto">
            <img
              className="h-full w-full object-cover rounded-full border-4 border-gray-500"
              src={previewImg || "/svg/img.png"}
              alt="Profile Picture"
            />
          </div>

          <form className="btn mt-12">
          <label
              htmlFor="file-input"
              className="text-white bg-ShadeOfPink rounded-full px-5 py-3 font-bold font-mont cursor-pointer"
            >
              +
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleChangeImg}
              className="hidden"
            />
          </form>
        </div>

        <button type="submit"
          onClick={handleSubmit}
          className="font-mont bg-ShadeOfPink rounded-lg px-3 py-2 max-w-72 w-full mx-auto mt-12 text-white"
        >
          Отправить
        </button>
      </div>
    </section>
  );
}
