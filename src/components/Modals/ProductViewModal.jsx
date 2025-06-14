import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaCircleXmark } from "react-icons/fa6";
import cn from "../../utils/cn";
import ReactPlayer from "react-player";

const ProductViewModal = ({
  isOpen = true,
  onClose,
  productDetails = null,
  src = null,
  className,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed  top-0 left-0 z-50 backdrop-blur-sm ${productDetails? "hidden xl:flex":"flex"} bg-[#2222227c] overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full bg-black/90 flex-col justify-center items-center modal-overlay zoom-in-element ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={cn(
          "bg-bg_primary rounded-lg p-5 shadow-lg w-[350px] h-[470px] md:w-[700px] md:h-[450px] lg:w-[800px] lg:h-[600px]  overflow-y-auto custom-bar",
          className
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-end justify-end">
            <FaCircleXmark
              onClick={() => onClose()}
              className="text-2xl text-accent duration-300 cursor-pointer mb-3"
            />
          </div>
          {productDetails ? (
            <div className="flex flex-col gap-10">
              <img
                className="lg:h-[400px] w-full"
                src={productDetails?.productImages?.[0]}
                alt="product_image"
              />

              <div className="flex flex-col gap-3">
                <p
                  onClick={() =>
                    navigate(
                      `/product/${productDetails?.title
                        ?.toLowerCase()
                        ?.split(` `)
                        ?.join("-")}`,
                      {
                        state: {
                          payload: { ...productDetails },
                        },
                      }
                    )
                  }
                  className="text-xl cursor-pointer font-bold text-white"
                >
                  {`${productDetails?.title}`}
                </p>
                <hr />
                <div className="h-60 overflow-y-auto custom-bar">
                  <div
                    className="bg-widget text-white p-5"
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <ReactPlayer url={src} controls width="100%" height="510px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  productDetails: PropTypes.object,
  src: PropTypes.string,
  className: PropTypes.string,
};

export default ProductViewModal;
