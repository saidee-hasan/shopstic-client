import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-80 bg-white">
      <ImSpinner9
        className="text-6xl text-gray-800 animate-spin drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        aria-label="Loading spinner"
      />
      <span
        className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 drop-shadow-md"
      >
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
