import React, { useState } from "react";

export default function PublicModal({ handleClosePublicModal }) {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 max-w-7xl w-full mx-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto overflow-y-auto max-h-full px-12 py-12  ">
        <div
          onClick={handleClosePublicModal}
          className="cross flex items-center justify-end "
        >
          <img src="/svg/cross.png" alt="" />
        </div>

        <div className="images flex items-center gap-4">
          <div className="img">
            <img className="max-w-72 w-full " src="/carti.webp" alt="" />
          </div>

          <div className="img">
            <img className="max-w-72 w-full " src="/carti.webp" alt="" />
          </div>

          <div className="img">
            <img className="max-w-72 w-full " src="/carti.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
