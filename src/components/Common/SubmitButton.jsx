import PropTypes from "prop-types";
import { CgSpinner } from "react-icons/cg";
import cn from "../../utils/cn";

const SubmitButton = ({
  children,
  isLoading,
  loadingText="processing...",
  className,
  ...rest
}) => {
  return (
    <button
      disabled={isLoading}
      className={cn(
        `w-full bg-[#047857] p-2 text-white rounded-sm font-medium text-sm uppercase hover:opacity-85 duration-300`,
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <div
          className={`flex gap-1 items-center justify-center h-full ${
            isLoading && "cursor-wait"
          }`}
        >
          <CgSpinner className="animate-spin text-xl" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default SubmitButton;