import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import cn from "../../utils/cn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = forwardRef(
  ({ className, label = "", type = "text", ...rest }, ref) => {
    const [changeType, setChangeType] = useState(type);

    const handleTypeChange = () => {
      if (changeType === "text") {
        setChangeType("password");
      } else {
        setChangeType("text");
      }
    };

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="flex items-center gap-1 py-2 font-medium text-sm text-white">
            {label} {rest?.required && <span className={"text-danger"}>*</span>}
          </label>
        )}
        <div className="flex items-center justify-between relative w-full">
          <input
            className={cn(
              `focus:outline-none bg-gray-100 w-full p-2 rounded-md`,
              className
            )}
            {...rest}
            type={changeType}
            ref={ref}
          />
          <div className="absolute right-0">
            {type === "password" && (
              <div
                onClick={handleTypeChange}
                className="p-2.5 flex items-end justify-end cursor-pointer"
              >
                {changeType == "text" ? (
                  <FaEyeSlash className="text-2xl font-bold h-full" />
                ) : (
                  <FaEye className="text-2xl font-bold h-full" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
