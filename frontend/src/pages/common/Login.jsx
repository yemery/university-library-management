import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Logo from "../../components/atoms/Logo";

const Login = () => {
  return (
    // <div className="md:grid md:grid-cols-2 w-full h-screen justify-center">
     <div className="flex md:flex-row flex-col w-full h-screen"> 
      <div className="w-full md:bg-black md:h-full flex flex-col justify-between p-3">
        <Logo />
        <p className="text-white hidden md:block px-10 py-3">Explore the world of Flowbite with our amazing templates.</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center my-auto">
        <form className=" w-2/3 px-3 flex flex-col gap-2">
          <div>
            <span className="text-2xl font-semibold">Welcome back!</span>
            <br />
            <span className="italic text-gray-500 text-sm">
              Log in to your account.
            </span>
          </div>

          <Input
            label="Your email"
            type="email"
            placeholder="enter your email"
          />
          <Input
            label="Your password"
            type="password"
            placeholder="enter your password"
          />

          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
