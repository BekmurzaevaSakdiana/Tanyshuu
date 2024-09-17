import React from "react";

export default function ModalAccept({ handleCloseAccept, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full mx-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mx-auto overflow-y-auto max-h-full px-12 py-12  ">
        <div
          onClick={handleCloseAccept}
          className="cross flex items-center justify-end "
        >
          <img src="/svg/cross.png" alt="" />
        </div>

        <div className="question flex flex-col items-center gap-4">
          <b className="font-mont">Вы точно хотите принять?</b>
          <div className="twin-btn flex items-center gap-12 mt-5">
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, #00aaff 0%, #0044cc 100%)",
              }}
            >
              Да
            </button>
            <button
              onClick={handleCloseAccept}
              className="px-5 py-2 text-white rounded-lg"
              style={{
                background: "linear-gradient(135deg, #ff6f6f 0%, #d32f2f 100%)",
              }}
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
