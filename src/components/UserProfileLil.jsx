import React, { useState } from "react";
import ModalAccept from "./ModalAccept";
import API from "../axios";
import ModalReject from "./ModalReject";

export default function UserProfileLil() {
  const [openAccept, setOpenAccept] = useState(false);

  const handleOpenAccept = () => {
    setOpenAccept((prev) => !prev);
  };

  const handleCloseAccept = () => {
    setOpenAccept((prev) => !prev);
  };

  const [openReject, setOpenReject] = useState(false);

  const handleOpenReject = () => {
    setOpenReject((prev) => !prev);
  };

  const handleCloseReject = () => {
    setOpenReject((prev) => !prev);
  };

  return (
    <div className="userProfileLil max-w-2xl w-full ">
      <div
        className="items-user flex items-center px-12 py-4 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #d36f8c 0%, #6a0dad 100%)", // #d36f8c - средне-темный розовый, #6a0dad - фиолетовый
        }}
      >
        <div className="img-profile w-20 h-16 rounded-full overflow-hidden border-2 border-gray-500">
          <img
            src="/carti.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="username-twin__bitches ml-4 flex items-center justify-between w-full">
          <div className="username">
            <p className="text-black font-mont">its_smoothie_</p>
          </div>

          <div className="twin__bitches flex items-center gap-3">
            <div onClick={handleOpenReject} className="reject">
              <img src="/svg/cross.png" alt="" className="w-6 h-6" />
            </div>
            <div onClick={handleOpenAccept} className="accept">
              <img src="/svg/checkBlack.png" alt="" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {openReject && <ModalReject handleCloseReject={handleCloseReject} />}
      {openAccept && <ModalAccept handleCloseAccept={handleCloseAccept} />}
    </div>
  );
}

export function Profile({ user, reqId, setData }) {
  const [openAccept, setOpenAccept] = useState(false);

  const sendReq = async (added) => {
    try {
      await API.post(
        `/friend-requests/${reqId}/${
          added ? "accept_request" : "decline_request"
        }/`
      );
    } catch (e) {}
  };

  const handleOpenAccept = () => {
    setOpenAccept((prev) => !prev);
  };

  const handleCloseAccept = () => {
    setOpenAccept((prev) => !prev);
  };

  const [openReject, setOpenReject] = useState(false);

  const handleOpenReject = () => {
    setOpenReject((prev) => !prev);
  };

  const handleCloseReject = () => {
    setOpenReject((prev) => !prev);
  };

  return (
    <div className="userProfileLil max-w-2xl w-full ">
      <div
        className="items-user flex items-center px-12 py-4 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #d36f8c 0%, #6a0dad 100%)", // #d36f8c - средне-темный розовый, #6a0dad - фиолетовый
        }}
      >
        <div className="img-profile w-20 h-16 rounded-full overflow-hidden border-2 border-gray-500">
          <img
            src={user.profile ?? "/carti.webp"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="username-twin__bitches ml-4 flex items-center justify-between w-full">
          <div className="username">
            <p className="text-black font-mont">{user.username}</p>
          </div>

          <div className="twin__bitches flex items-center gap-3">
            <div onClick={handleOpenReject} className="reject">
              <img src="/svg/cross.png" alt="" className="w-6 h-6" />
            </div>
            <div onClick={handleOpenAccept} className="accept">
              <img src="/svg/checkBlack.png" alt="" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {openReject && (
        <ModalReject
          onConfirm={() => {
            sendReq().then((res) => {
              setOpenReject(false);
              setData((prev) => prev.filter((item) => item.id != reqId));
            });
          }}
          handleCloseReject={handleCloseReject}
        />
      )}
      {openAccept && (
        <ModalAccept
          onConfirm={() => {
            sendReq(true).then((res) => {
              setOpenAccept(false);
              setData((prev) => prev.filter((item) => item.id != reqId));
            });
          }}
          handleCloseAccept={handleCloseAccept}
        />
      )}
    </div>
  );
}
