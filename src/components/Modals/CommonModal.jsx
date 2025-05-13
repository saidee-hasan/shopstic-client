import { useEffect } from "react";
import PropTypes from "prop-types";
import { FaCircleXmark } from "react-icons/fa6";
import cn from "../../utils/cn";

const CommonModal = ({
  isOpen,
  onClose,
  className,
  title,
  children,
  isOutsideClick = true,
}) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        e.target.classList.contains("modal-overlay") &&
        isOutsideClick
      ) {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose, isOutsideClick]);

  return (
    <div
      className={`fixed  top-0 left-0 z-50 backdrop-blur-sm bg-[#2222227c] overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full bg-black/90 flex flex-col justify-center items-center modal-overlay zoom-in-element ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={cn(
          "bg-bg_primary border rounded-lg p-5 shadow-lg  overflow-y-auto custom-bar",
          className
        )}
      >
        <div className="flex flex-col gap-5">
          {isOutsideClick ? (
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{title}</span>
              <FaCircleXmark
                onClick={() => onClose()}
                className="text-2xl text-accent duration-300 cursor-pointer"
              />
            </div>
          ) : null}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

CommonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  isOutsideClick: PropTypes.bool,
};

export default CommonModal;