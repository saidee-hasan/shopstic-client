import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";
import SubmitButton from "../../Common/SubmitButton";
import { useGetUser } from "../../../hooks/useGetUser";
import { useCreateReportMutation } from "../../../store/shop/service/report/reportApi";

const ReportForm = ({ setReportModal }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useGetUser();
  const { pathname } = useLocation();

  const [addReport, { isLoading }] = useCreateReportMutation();

  const handleReport = async (data) => {
    const newData = {
      report: { ...data },
      from: { ...user },
      againstTo: pathname?.split("/")?.[2],
    };

    try {
      const res = await addReport(newData);
      if (!res?.error) {
        toast.success("Your report has been submitted successfully!", {
          id: "success",
          duration: 3000,
        });
        setReportModal(false);
      } else {
        toast.error("Something went wrong 😓", { id: "report_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleReport)}
        className="flex flex-col gap-1"
      >
        <Input
          {...register("title")}
          required
          label="Report title"
          placeholder="Title"
          className={"bg-[#1C2822] text-white rounded-sm"}
        />
        <TextArea
          {...register("reportMessage")}
          required
          label="Report message"
          placeholder="Message"
          className={"bg-[#1C2822] text-white rounded-sm h-36"}
        />
        <SubmitButton isLoading={isLoading}>Send</SubmitButton>
      </form>
    </div>
  );
};

ReportForm.propTypes = {
  setReportModal: PropTypes.func,
};

export default ReportForm;
