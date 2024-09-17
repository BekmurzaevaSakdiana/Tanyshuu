import React, { useState } from "react";
import axios from "axios";

export default function ChoosePostModal({ handleCloseChooseModal, userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  // Хранит выбранный пользователем файл изображения.
  const [previewImg, setPreviewImg] = useState(null);
  // Хранит URL-адрес для предварительного просмотра выбранного изображения.
  const[succes,setSuccess]=useState(false)

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    // Получаем первый выбранный файл.
    if (file) {
      setSelectedFile(file);
      // Сохраняем выбранный файл в состоянии.
      
    }
  };

  //  Функция, которая вызывается при выборе файла пользователем

  const handleSubmit = async () => {
    if (!selectedFile) return;
    // Проверяет, был ли выбран файл

    const formData = new FormData();
    // чтобы отправить файл на сервер.
    console.log(selectedFile);
    
    formData.append("images[0][image]", selectedFile);
    // Добавляет файл в FormData с ключом "profile".

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "https://akmaanai.pythonanywhere.com/api/accounts/my_profile/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setSuccess(true);
      handleCloseChooseModal()
    } catch (error) {
      console.error(error.message || error);
    }
  };

  // Функция, вызываемая при нажатии кнопки "Отправить

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full mx-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mx-auto overflow-y-auto max-h-full px-8 py-8  ">
        <div
          onClick={handleCloseChooseModal}
          className="cross flex items-center justify-end "
        >
          <img src="/svg/cross.png" alt="" />
        </div>

        <div className="images flex flex-col items-center mt-5">
          <div className="top  max-w-60 w-full mx-auto  mb-5">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="aspect-square object-cover object-center w-full"
              />
            ) : (
              <p className="text-bold text-center pt-12 ">Не выбрано</p>
            )}
            
          </div>
          <div className="bottom flex flex-col gap-4 text-center mt-6">
            <div className="choose">
              <label
                htmlFor="file-input"
                className="text-white bg-ShadeOfPink rounded-lg px-3 py-2  font-mont cursor-pointer"
              >
                Выбрать
              </label>

              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleChangeImg}
                className="hidden"
              />
            </div>

            <div className="post">
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-3 py-2 bg-ShadeOfPink text-white rounded-lg  "
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
