import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-80 text-white bg-widget">
      <ImSpinner9 className="text-6xl animate-spin" />
      <span className="font-medium">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;