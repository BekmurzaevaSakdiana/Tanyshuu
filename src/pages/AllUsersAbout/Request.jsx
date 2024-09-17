import React, { useEffect, useState } from "react";
import UserProfileLil, { Profile } from "../../components/UserProfileLil";
import API from "../../axios";

export default function Request() {
  const [data, setData] = useState(null);
  useEffect(() => {
    API.get(`/friend-requests/incoming_requests/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return (
    <div className="h-screen mt-12">
      <div className="container">
        <div className="request-items flex flex-col items-center">
          {data && data.map((item) => <Profile setData={setData} reqId={item.id} user={item.from_user} />)}
          {data && data.length == 0 && <h1 className="text-white text-2xl font-bold">Пока пусто</h1>}
        </div>
      </div>
    </div>
  );
}
