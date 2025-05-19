import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-80 bg-widget text-white">
      <ImSpinner9 className="text-6xl animate-spin" />
      <span className="font-medium">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;