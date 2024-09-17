import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterModal from "./FilterModal";
import SearchPostsModal, { ImagesPublic } from "./SearchPostsModal";
import API from "../axios";
import { ProfileContext } from "../context/profileContext";
import BurgerMenu from "./BurgerMenu";

export default function HeaderMain() {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [changed, setChanged] = useState(null);
  const [_, setProviderProfile] = useContext(ProfileContext);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleToggleModal = () => {
    setOpen((prev) => !prev);
  };

  const openBurgerModal = () => {
    setOpenBurgerMenu((prev) => !prev);
  };

  const closeBurgerModal = () => {
    setOpenBurgerMenu((prev) => !prev);
  };

  const handleFindUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.get("/auth/", {
        params: {
          search: stateSearch,
        },
      });

      if (response.status === 200) {
        setAllUsers(response.data);
      } else {
        setError("Ошибка при получении данных");
      }
    } catch (error) {
      setError("Не найдено");
      alert("хуетааа");
    } finally {
      setLoading(false);
    }
  };

  // Фильтруем пользователей на основе введенного текста

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Обработка изменения в поле ввода
  const handleInputChange = (e) => {
    const value = e.target.value;
    setStateSearch(value);
    if (value === "") {
      setAllUsers([]);
    }
  };

  useEffect(() => {
    API.get("/accounts/my_profile/")
      .then((res) => {
        setProviderProfile(res.data);
      })
      .catch((err) => {
        console.error(`Пиздец ошибка:`, err);
      });
  }, []);

  useEffect(() => {
    const closeSearch = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setAllUsers([]);
      }
    };
    if (searchRef.current) {
      document.addEventListener("click", closeSearch);
    }
    return () => document.removeEventListener("click", closeSearch);
  }, [searchRef.current]);

  
  return (
    <header className="bg-black">
      <div className="container">
        <div className="header-items flex items-center justify-around px-6 py-5 max-sm:flex-col max-sm:gap-8">
          <div className="logo flex items-center gap-2">
            <div className="tanyshuu-logo w-8">
              <img src="/svg/tinder-logo2.png" alt="logo" />
            </div>
            <p className="font-mont font-bold text-xl text-white">TANYSHUU</p>
          </div>

          <div className="inpt__icons-btn flex items-center gap-12">
            <div className="search-inpt relative bg-white rounded-lg gap-9 max-w-3xl w-full">
              <input
                className="transition-focus duration-1000 linear delay-500 outline-none bg-transparent w-full px-12 py-1 rounded-lg focus:shadow-pink max-sm:px-10"
                type="text"
                placeholder="ПОИСК"
                value={stateSearch}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleFindUsers()}
              />
              <div
                onClick={handleFindUsers}
                className="searchIcon max-w-6 absolute right-0 top-0 h-full flex items-center"
              >
                <img src="/svg/searchIcon.png" alt="search icon" />
              </div>
            </div>

            <div className="icons flex items-center gap-5 max-md:hidden">
              <div onClick={() => navigate("/main")} className="icon-png w-7">
                <img src="/svg/home.png" alt="home" />
              </div>
              <div onClick={() => navigate("profile")} className="icon-png w-7">
                <img src="/svg/user.png" alt="profile" />
              </div>
              <div
                onClick={() => navigate("allUsersProfile")}
                className="icon w-7"
              >
                <img src="/svg/users.png" alt="all users" />
              </div>
              <div className="btn-filter">
                <button
                  onClick={handleToggleModal}
                  className="text-black font-mont text-sm bg-white px-3 py-1 rounded-lg"
                >
                  Фильтрация
                </button>
              </div>
            </div>

            <div
              onClick={openBurgerModal}
              className="max-w-7 burger-menu hidden max-md:block"
            >
              <img src="/svg/menu.png" alt="menu" />
            </div>
          </div>
        </div>
      </div>

      <div className="search-results  container mx-auto p-4">
        <div className="container relative">
          {loading && (
            <div className="img flex items-center justify-center min-h-screen">
              <img src="/svg/loading.gif" alt="Loading" />
            </div>
          )}
          {error && (
            <p className="text-red-500 font-mont font-bold text-center">
              ошибка
            </p>
          )}

          {filteredUsers && filteredUsers.length > 0 ? (
            <div
              ref={searchRef}
              className="absolute z-50 w-full flex justify-center items-center"
            >
              <div className="userProfileLil   max-w-2xl w-full mx-auto">
                {filteredUsers.map((myProfile, index) => (
                  <div
                    key={index}
                    className="items-user mb-2 flex items-center justify-center px-12 py-2 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #d36f8c 0%, #6a0dad 100%)",
                    }}
                  >
                    <div className="img-profile w-20 h-16 rounded-full overflow-hidden border-2 border-gray-500">
                      <img
                        src={myProfile.profile || "/ponchick.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="username-twin__bitches ml-4 flex items-center justify-between w-full">
                      <div className="username">
                        <p className="text-black font-mont">
                          {myProfile.username}
                        </p>
                      </div>

                      <div
                        onClick={() => setChanged(myProfile)}
                        className="twin__bitches flex justify-center  items-center gap-3"
                      >
                        <button className="text-black bg-white text-sm px-3 py-1 rounded-lg">
                          Посмотреть публикации
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Пусто</div>
          )}
        </div>
      </div>
      {open && (
        <FilterModal
          handleCloseModal={handleToggleModal}
          handleToggleModal={handleToggleModal}
        />
      )}
      {changed && (
        <ImagesPublic
          images={changed.images}
          handleClosePostsModal={() => setChanged(null)}
        />
      )}

      {openBurgerMenu && <BurgerMenu closeBurgerModal={closeBurgerModal} />}
    </header>
  );
}
