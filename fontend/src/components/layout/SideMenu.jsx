import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import UserProfileInfo from "../cards/UserProfileInfo";
const SideMenu = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }

    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between w-64 h-[calc(100vh-61px)] bg-slate-50/50 border-r  border-slate-100/70 p-5 sticky top-[61px] z-20">
    <div className="">
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-4 px-6 rounded-full mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" /> {item.label}
        </button>
      ))}
    </div>

    <div className="cursor-pointer">
            <UserProfileInfo
              fullname={user && user.fullName}
              username={user && user.username}
            />
    </div>
    </div>
  );
};

export default SideMenu;
