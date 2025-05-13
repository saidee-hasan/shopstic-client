import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "../../../Common/SelectInput";
import JoditTextArea from "../../../Common/JoditTextArea";
import SubmitButton from "../../../Common/SubmitButton";
import CommonModal from "../../../Modals/CommonModal";
import FeedbackMessage from "./FeedbackMessage";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useFeedbackMutation } from "../../../../store/dashboard/service/feedback/feedbackApi";

const FeedbackForm = () => {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useGetUser();
  const [feedback, { isLoading }] = useFeedbackMutation();

  const { handleSubmit, register, reset } = useForm();

  const handleFeedback = async (data) => {
    if (content.length < 20) {
      toast.error("Feedback too short", { id: "error" });
      return;
    }
    const newData = {
      ...data,
      feedbackMessage: content,
      user,
    };

    try {
      const res = await feedback(newData);
      if (!res?.error) {
        setIsModalOpen(true);
        setContent("");
        reset();
      } else {
        toast.error("Something went wrong 😓", { id: "error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFeedback)}
        className="flex flex-col gap-2 bg-widget p-5"
      >
        <SelectInput
          {...register("feedbackType")}
          label="Type"
          required
          className="bg-[#1C2822] text-white rounded-sm"
        >
          <option value="bug">Bug</option>
          <option value="suggation">Suggation</option>
          <option value="other">Other</option>
        </SelectInput>
        <span className="py-2 block font-medium text-sm text-white">
          Feedback content <span className="text-danger">*</span>
        </span>
        <div>
          <JoditTextArea
            height={"350px"}
            content={content}
            setContent={setContent}
          />
        </div>

        <div className="mt-3 flex flex-col items-end">
          <SubmitButton isLoading={isLoading} className="w-40">
            Send feedback
          </SubmitButton>
        </div>
      </form>
      {
        <CommonModal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          className="w-[330px] md:w-[500px]"
          key={"feedback"}
        >
          <FeedbackMessage />
        </CommonModal>
      }
    </div>
  );
};

export default FeedbackForm;
