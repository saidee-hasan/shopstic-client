import { FaThumbsUp } from "react-icons/fa6";

const FeedbackMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-2">
      <FaThumbsUp className="text-9xl text-start text-[#047857]" />
      <h1 className="text-3xl font-medium text-white">Thank You!</h1>
      <p className="text-justify text-lg text-white">{`We appreciate your feedback and the time you took to share it with us. Your thoughts and suggestions help us improve our service and deliver a better experience. If you need further assistance or have more to share, don't hesitate to reach out. Thank you for helping us grow!`}</p>
    </div>
  );
};

export default FeedbackMessage;
