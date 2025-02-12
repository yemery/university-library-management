import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Logo from "../../components/atoms/Logo";
import { useFormik } from "formik";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // redirect user to its dashboard based on role if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${role}/dashboard`);
    }
  }, [isAuthenticated]);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Pease enter a valid email address")
        .required("Required"),
      password: Yup.string()
        .max(25, "Only 25 caracters are allowed")
        .min(3, "Enter at least 3 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(authenticate(values));
      if (response?.error?.code == "ERR_BAD_REQUEST") {
        toast.error("Invalid credentials");
      }
    },
  });

  return (
    <div className="flex md:flex-row flex-col w-full h-screen">
      <div className="w-full md:bg-black md:h-full flex flex-col justify-between p-3">
        <Logo />
        <p className="text-white hidden md:block px-10 py-3">
          Explore a seamless library experience.{" "}
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center my-auto gap-y-3">
        <form
          className=" w-2/3 px-3 flex flex-col gap-y-5"
          onSubmit={loginForm.handleSubmit}
        >
          <div>
            <span className="text-2xl font-semibold">Welcome back!</span>
            <br />
            <span className="italic text-gray-500 text-sm">
              Log in to your account.
            </span>
          </div>

          <div>
            <Input
              label="Your email"
              type="email"
              name="email"
              placeholder="enter your email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <ErrorMessage message={loginForm.errors.email} />
            )}
          </div>
          <div className="space-y-1">
            <Input
              label="Your password"
              type="password"
              name="password"
              placeholder="enter your password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <ErrorMessage message={loginForm.errors.password} />
            )}
          </div>

          <Button text="Submit" />
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
