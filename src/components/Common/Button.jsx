import PropTypes from "prop-types";
import cn from "../../utils/cn";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        `w-full bg-[#047857] p-2.5 text-white rounded-sm font-medium text-sm uppercase hover:opacity-85`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Button;
