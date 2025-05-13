import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { useCreateJwtMutation, useCreateUserMutation } from "../../../store/main/service/user/auth_api_service";
import { auth } from "../../../firebase/firebase.config";
import { addUser } from "../../../store/main/features/user/userSlice";
import SubmitButton from "../../Common/SubmitButton";

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const disptach = useDispatch();
  const [createUser] = useCreateUserMutation();
  const [createJwt,{isLoading:jwtLoading}]=useCreateJwtMutation()

  const handleRegistration = async (data) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data?.password)) {
      toast.error(
        "Password must be at least 8 characters,at least one letter, one number, and one special character",
        { id: "validation_error", duration: 7000 }
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (result?.user?.accessToken && result.user.email) {
        await createJwt({ email: result.user.email });
        delete data?.password;
        const res = await createUser(data);
        if (res?.data?.acknowledged) {
          disptach(addUser({ ...res?.data }));
          setIsLoading(false);
          navigate(from, { replace: true });
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        toast.error(`Email ${data?.email} already used`, { id: "email_error" });
      } else {
        toast.error("Something went wrong please try again letter", {
          id: "try_again_letter",
        });
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my_container">
      <div className="md:w-4/5 lg:w-4/6 xl:w-7/12 bg-white border shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden md:h-2/5 lg:h-[420px] xl:h-4/6">
        <div className="bg-[#047857] md:rounded-r-[30%] flex flex-col gap-5 items-center justify-center p-7 text-center text-white relative ltr-animation">
          <Link to="/" title="Return main website">
            <FaHome className="text-5xl border p-2 rounded-full" />
          </Link>
          <h2 className="font-bold text-3xl capitalize">Welcome Back!</h2>
          <span>
            Enter your personal details to use all of the site features
          </span>
          <Link to="/sign-in">
            <Button className="uppercase w-40 border">Sign In</Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col items-center justify-center gap-5 w-full p-7"
        >
          <h1 className="font-bold text-3xl capitalize">Create Account</h1>
          <div className="w-full flex flex-col gap-5">
            <Input {...register("fName")} placeholder="First name *" required />
            <Input {...register("lName")} placeholder="Last name *" required />
            <Input
              {...register("email")}
              placeholder="Email *"
              type="email"
              required
            />
            <Input
              {...register("password")}
              placeholder="*******"
              type="password"
              required
            />
          </div>
          <span className="text-xs">
            Password must be at least 8 characters, one letter, one number, and
            one special character
          </span>
          <SubmitButton
            isLoading={isLoading || jwtLoading}
            className="font-medium uppercase text-sm w-36"
          >
            Sing Up
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Registration;
