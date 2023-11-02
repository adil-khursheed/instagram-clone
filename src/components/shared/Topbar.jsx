import { Logo } from "../index";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Topbar = () => {
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
    <header className="sm:hidden w-full sticky top-0 bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <Link to={"/"}>
          <Logo className2="hidden" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-[22px]">
          <Link to={"/notifications"}>
            <AiOutlineHeart />
          </Link>
        </div>
        <button className="text-[22px]" onClick={logoutHandler}>
          <BiLogOutCircle />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
