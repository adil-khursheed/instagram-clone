import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Loader, Logo } from "./index";
import { registerUser } from "../features/auth/authAction";
import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className={`mx-auto w-full max-w-sm bg-transparent rounded-xl p-10 border border-black/10`}>
            <div className="mb-4 flex justify-center">
              <Logo className2="hidden" />
            </div>
            <h3 className="text-center mb-6 text-lg leading-tight">
              Sign up to see photos and videos from your friends.
            </h3>

            <form onSubmit={handleSubmit(signup)}>
              <div className="space-y-5">
                <Input
                  placeholder="Email address"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
                <Input
                  placeholder="Username"
                  {...register("username", {
                    required: true,
                  })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                />
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
          <div
            className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-5 mt-4 border border-black/10`}>
            <p className=" text-center text-base text-black/60">
              Have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-blue-600 transition-all duration-200 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
