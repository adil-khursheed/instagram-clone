import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoHome, GoSearch, GoHomeFill } from "react-icons/go";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { BiLogOutCircle } from "react-icons/bi";
import { Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { toast } from "react-toastify";

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
];

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const [logoutApiCall] = useLogoutMutation();

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
    <div className="min-h-screen w-[72px] xl:w-60 flex border border-r-[1px] border-r-slate-400 py-4 px-2">
      <div className="w-full flex flex-col items-center xl:items-start">
        <div className="w-full flex items-center justify-center xl:justify-start mt-6 mb-10 pl-3">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        {navItems.map((navItem) => (
          <NavLink
            key={navItem.id}
            to={navItem.urlPath}
            className=" w-full hover:bg-slate-100 p-3 mb-2 rounded">
            {({ isActive }) => (
              <div className="flex items-center gap-5 ">
                <div className="text-[28px]">
                  {isActive ? navItem?.iconFill : navItem?.iconOutline}
                </div>
                <div
                  className={`${isActive ? "font-bold" : ""} hidden xl:block`}>
                  {navItem.title}
                </div>
              </div>
            )}
          </NavLink>
        ))}

        <NavLink
          to={"/:username"}
          className="w-full p-3 mb-2 hover:bg-slate-100 rounded">
          {({ isActive }) => (
            <div className="flex gap-5 items-center ">
              <div
                className={`${
                  isActive ? "border-2 border-black rounded-full" : ""
                } w-7 h-7 flex items-center justify-center rounded-full p-[2px]`}>
                <img
                  src={user.avatar.url}
                  alt="profile"
                  className="w-full rounded-full"
                />
              </div>
              <div className={`hidden xl:block ${isActive ? "font-bold" : ""}`}>
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
          <div className="hidden xl:block">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
