import React, { useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import { ProfileItem } from "../../components/ProfileItem";

export default function Frends() {
  const [profile, setProfile] = useContext(ProfileContext);
  return (
    <div className="h-screen mt-12">
      <div className="container">
        <div className="request-items flex flex-col items-center">
          {profile && profile.friends.map((item) => <ProfileItem user={item} />)}
          {profile && profile.friends.length == 0 && (
            <h1 className="text-white text-2xl font-bold">Пока пусто</h1>
          )}
        </div>
      </div>
    </div>
  );
}
