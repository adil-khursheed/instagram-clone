import { GoHome, GoHomeFill } from "react-icons/go";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useGetMyProfileQuery } from "../../features/profile/profileApiSlice";

const navItems = [
  {
    id: 1,
    title: "Home",
    iconOutline: <GoHome />,
    iconFill: <GoHomeFill />,
    urlPath: "/",
  },
  {
    id: 2,
    title: "Explore",
    iconOutline: <MdOutlineExplore />,
    iconFill: <MdExplore />,
    urlPath: "/explore",
  },
  {
    id: 3,
    title: "Create",
    iconOutline: <BsPlusCircle />,
    iconFill: <BsPlusCircleFill />,
    urlPath: "/create-post",
  },
  {
    id: 4,
    title: "Messages",
    iconOutline: <RiMessengerLine />,
    iconFill: <RiMessengerFill />,
    urlPath: "/messages",
  },
];

const Bottombar = () => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetMyProfileQuery();

  return (
    <section className="w-full sticky bottom-0 p-2 px-4 flex justify-between items-center bg-white shadow-[0_-4px_10px_0_#dddddd;] sm:hidden">
      {navItems.map((navItem) => (
        <NavLink
          key={navItem.id}
          to={navItem.urlPath}
          className="hover:bg-slate-100 p-2 rounded">
          {({ isActive }) => (
            <div className="flex flex-col items-center">
              <div
                className={`${
                  navItem.title === "Create" ? "text-[18px]" : "text-[20px]"
                }`}>
                {isActive ? navItem?.iconFill : navItem?.iconOutline}
              </div>
              <div className={`${isActive ? "font-bold" : ""} text-sm`}>
                {navItem.title}
              </div>
            </div>
          )}
        </NavLink>
      ))}
      <NavLink
        to={`/${user.username}`}
        className="hover:bg-slate-100 p-2 rounded">
        {({ isActive }) => (
          <div className="flex flex-col items-center ">
            <div
              className={`${
                isActive ? "border-2 border-black rounded-full" : ""
              } w-5 h-5 flex items-center justify-center rounded-full p-[2px]`}>
              <img
                src={data?.data?.account.avatar.url}
                alt="profile"
                className="w-full rounded-full"
              />
            </div>
            <div className={` ${isActive ? "font-bold" : ""} text-sm`}>
              Profile
            </div>
          </div>
        )}
      </NavLink>
    </section>
  );
};

export default Bottombar;
