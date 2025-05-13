import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaCircleXmark } from "react-icons/fa6";
import { numberWithCommas } from "../../../utils/numberWithComma";
import { useGetCart } from "../../../hooks/useGetCart";
import Button from "../../Common/Button";
import { useNavigate } from "react-router-dom";
import FloatingProductCard from "./FloatingProductCard";

const FloatingCartModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { userCart } = useGetCart();
  const modalRef = useRef(null);

  const total = userCart?.reduce((total, item) => {
    return (total += item?.buyQnt * item?.price);
  }, 0);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="rtl-animation origin-right h-screen transition-all bg-white min-w-[320px] sm:w-[360px] md:w-[380px] shadow-2xl duration-500 font-Quicksand flex flex-col justify-between overflow-y-auto right-0 fixed z-50 top-0"
    >
      <div className="border-l border-t">
        <div className="flex items-center justify-between p-2 bg-widget">
          <p className="uppercase text-white font-semibold">your cart</p>
          <button
            className="text-white hover:text-opacity-80 "
            onClick={() => onClose()}
          >
            <FaCircleXmark className="text-2xl text-accent duration-300 cursor-pointer" />
          </button>
        </div>
        {userCart?.length > 0 ? (
          <>
            {userCart?.map((product) => (
              <FloatingProductCard key={product?._id} product={product} />
            ))}
          </>
        ) : (
          <p className="text-center font-semibold text-black mt-2">
            Your cart list is empty!
          </p>
        )}
      </div>
      <div>
        {userCart?.length > 0 && (
          <>
            <div className="flex items-center justify-between h-9 p-2 border-b">
              <span></span>
              <span className="font-semibold text-textGray">Sub-Total</span>
              <span className="font-bold">
                {numberWithCommas(parseInt(Math.round(total)))}TK
              </span>
            </div>

            <Button
              onClick={() => {
                navigate("/dashboard/my-cart"), onClose();
              }}
              className="w-full inline-block text-center p-2 text-white font-bold origin-top duration-300 rounded-none"
            >
              Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

FloatingCartModal.propTypes = {
  onClose: PropTypes.func,
};

export default FloatingCartModal;
