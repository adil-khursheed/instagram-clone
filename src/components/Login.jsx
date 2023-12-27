import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Loader, Logo } from "./index";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const loginHandler = async (data) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials({ ...userData }, data.email));
      navigate("/");
      toast.success(userData.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-5 border border-black/10`}>
            <div className="mb-6 flex justify-center">
              <Logo className2="hidden" />
            </div>

            <form onSubmit={handleSubmit(loginHandler)}>
              <div className="space-y-5">
                <Input
                  className="px-3 py-2"
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
                  type="password"
                  className="px-3 py-2"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                />
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </form>
          </div>
          <div
            className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-5 mt-4 border border-black/10`}>
            <p className=" text-center text-base text-black/60">
              Don&apos;t have an account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-blue-600 transition-all duration-200 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
