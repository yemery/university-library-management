import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Logo from "../../components/atoms/Logo";
import { useFormik } from 'formik';
import ErrorMessage from "../../components/atoms/ErrorMessage";
import * as Yup from 'yup';
const Login = () => {
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Pease enter a valid email address")
        .required("Required"),
      password: Yup.string()
        .max(25, "Only 25 caracters are allowed")
        .min(8, "Enter at least 8 characters")
        .required("Required"),
      }),

    onSubmit: values => {
      // dispatch
      console.log(values)
    }
  })
  return (
    // <div className="md:grid md:grid-cols-2 w-full h-screen justify-center">
     <div className="flex md:flex-row flex-col w-full h-screen"> 
      <div className="w-full md:bg-black md:h-full flex flex-col justify-between p-3">
        <Logo />
        <p className="text-white hidden md:block px-10 py-3">Explore the world of Flowbite with our amazing templates.</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center my-auto gap-y-3">
        <form className=" w-2/3 px-3 flex flex-col gap-y-5" onSubmit={loginForm.handleSubmit}>
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
    </div>
  );
};

export default Login;
