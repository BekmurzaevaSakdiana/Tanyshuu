import React from "react";

export function ProfileItem({ user }) {
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

          <div className="twin__bitches flex flex-col items-center gap-3">
            <div  className="reject">
             <p className="text-black font-mont font-medium">{user.instagramnick}</p>
            </div>
            <div className="accept">
            <p className="text-black font-mont font-medium">{user.phone_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
