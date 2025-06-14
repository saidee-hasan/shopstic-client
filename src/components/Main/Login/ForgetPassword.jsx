import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase/firebase.config";
import Input from "../../Common/Input";
import SubmitButton from "../../Common/SubmitButton";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleForgetPassword = async ({ email }) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Please check your email ${email}`, {
        id: "send_success",
        duration: 4000,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong please try again letter.", {
        id: error,
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleForgetPassword)}>
        <Input
          {...register("email")}
          label="Please enter your email"
          required
          placeholder="example@gmail.com"
          type="email"
          className="bg-[#1C2822] text-white rounded-sm"
        />
        <SubmitButton isLoading={isLoading}>
          send
        </SubmitButton>
      </form>
    </div>
  );
};
export default ForgetPassword;
