import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoHome, GoSearch, GoHomeFill } from "react-icons/go";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";

import { Logo } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
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
    title: "Search",
    iconOutline: <GoSearch />,
    iconFill: <ImSearch />,
    urlPath: "/search",
  },
  {
    id: 3,
    title: "Explore",
    iconOutline: <MdOutlineExplore />,
    iconFill: <MdExplore />,
    urlPath: "/explore",
  },
  {
    id: 4,
    title: "Messages",
    iconOutline: <RiMessengerLine />,
    iconFill: <RiMessengerFill />,
    urlPath: "/messages",
  },
  {
    id: 5,
    title: "Create",
    iconOutline: <BsPlusCircle />,
    iconFill: <BsPlusCircleFill />,
    urlPath: "/create-post",
  },
];

const LeftSidebar = () => {
  const user = useSelector(selectCurrentUser);
  const [logoutApiCall] = useLogoutMutation();
  const { data } = useGetMyProfileQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("You have logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="h-screen hidden sm:flex sm:w-[72px] md:w-60 border-r-[2px] border-r-slate-200 py-4 px-2">
      <div className="w-full flex flex-col items-center md:items-start">
        <div className="w-full flex items-center justify-center md:justify-start mt-2 mb-10 md:pl-3">
          <Link to={"/"}>
            <Logo className1="hidden md:block" className2="block md:hidden" />
          </Link>
        </div>
        {navItems.map((navItem) => (
          <NavLink
            key={navItem.id}
            to={navItem.urlPath}
            className=" w-full hover:bg-slate-100 p-3 mb-2 rounded">
            {({ isActive }) => (
              <div className="flex items-center gap-5 ">
                <div
                  className={`${
                    navItem.title === "Create" ? "text-[25px]" : "text-[28px]"
                  }`}>
                  {isActive ? navItem?.iconFill : navItem?.iconOutline}
                </div>
                <div
                  className={`${isActive ? "font-bold" : ""} hidden md:block`}>
                  {navItem.title}
                </div>
              </div>
            )}
          </NavLink>
        ))}

        <NavLink
          to={`/${user.username}`}
          className="w-full p-3 mb-2 hover:bg-slate-100 rounded">
          {({ isActive }) => (
            <div className="flex gap-5 items-center ">
              <div
                className={`${
                  isActive ? "border-2 border-black rounded-full" : ""
                } w-7 h-7 flex items-center justify-center rounded-full p-[2px]`}>
                <img
                  src={data?.data?.account.avatar.url}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <div className={`hidden md:block ${isActive ? "font-bold" : ""}`}>
                Profile
              </div>
            </div>
          )}
        </NavLink>

        <button
          className="w-full flex gap-5 items-center p-3 mb-2 mt-auto hover:bg-slate-100 rounded"
          onClick={logoutHandler}>
          <div className="text-[28px]">
            <BiLogOutCircle />
          </div>
          <div className="hidden md:block">Logout</div>
        </button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
