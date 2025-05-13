import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBoxOpen, FaFutbol } from "react-icons/fa";
import { numberWithCommas } from "../../../utils/numberWithComma";

const GlobalSearch = ({ isModalOpen, setIsModalOpen, data, isLoading }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsModalOpen, isModalOpen]);

  return (
    <div className="z-50" ref={modalRef}>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`bg-white rounded-md border absolute top-12 left-0 w-full`}
        >
          {data?.length ? (
            <div className="flex flex-col gap-2 h-[400px] overflow-y-auto custom-bar">
              {data?.map((product) => (
                <div
                  onClick={() => {
                    navigate(
                      `/product/${product?.title
                        ?.toLowerCase()
                        ?.split(` `)
                        ?.join("-")}`,
                      {
                        state: {
                          payload: { ...product },
                        },
                      }
                    ),
                      setIsModalOpen(false);
                  }}
                  key={product?._id}
                  className="hover:bg-widget hover:text-white duration-500 p-3 rounded-md cursor-pointer"
                
                >
                  <div className="flex items-center flex-wrap xl:flex-nowrap gap-5">
                    <img
                      src={product?.productImages?.[0]}
                      className="w-12 h-12 border rounded"
                    />
                    <div className="flex flex-col gap-1">
                      <span>
                        {product?.title?.length > 50
                          ? `${product?.title?.slice(0, 50)}...`
                          : product?.title}
                      </span>
                      <div>
                        <div className="">
                          {product?.specialPrice ? (
                            <div className="flex gap-3">
                              <span className="text-[#047857] font-bold">
                                TK {numberWithCommas(product?.specialPrice)}
                              </span>
                              <span className="line-through text-primary font-medium">
                                TK {numberWithCommas(product?.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-primary">
                              TK {numberWithCommas(product?.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[450px] w-full">
              {!isLoading ? (
                <FaBoxOpen className="text-7xl text-accent w-full" />
              ) : (
                <FaFutbol className="text-7xl text-widget animate-spin" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

GlobalSearch.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default GlobalSearch;
