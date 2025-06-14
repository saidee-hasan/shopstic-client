import { useGetRatingProductQuery } from "../../../store/main/service/product/productApi";
import PropTypes from "prop-types";
import { numberWithCommas } from "../../../utils/numberWithComma";
import { FaSpinner, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MostReviewProducts = ({ sellerId }) => {
  const query = new URLSearchParams({
    sellerId,
    page: 0,
    limit: 10,
    star: 4,
  }).toString();
  const navigate = useNavigate();

  const handleRedirect = (product) => {
    if (product) {
      navigate(
        `/product/${product?.title?.toLowerCase()?.split(` `)?.join("-")}`,
        {
          state: {
            payload: { ...product },
          },
        }
      );
    } else {
      toast.error("Data missing!. Please try again!", { id: "product_error" });
    }
  };

  const { data, isLoading } = useGetRatingProductQuery(query);

  return (
    <div
      className={`flex flex-col gap-y-10 ${
        data?.rating === "no" ? "hidden" : !data?.data?.length ? "hidden" : null
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-lg">Most-Reviewed Products</h2>
        <span>Discover Top-Rated Products for You!</span>
      </div>
      {!isLoading ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {data?.data?.map((product) => (
              <div
                key={product?._id}
                onClick={() => handleRedirect(product)}
                className={`rounded-xl p-3 lg:p-5 bg-white border-b-2 relative cursor-pointer flex flex-col justify-between`}
              >
                <div className="flex product-center justify-center">
                  <img
                    className={`h-32 w-32 lg:h-52 lg:w-full`}
                    src={`${product?.productImages?.[0]}`}
                    alt="product_image"
                  />
                </div>

                <div>
                  <p className="text-sm hover:underline hover:text-[#047857]">
                    {`${
                      product?.title?.length > 50
                        ? `${product?.title?.slice(0, 50)}...`
                        : product?.title
                    }`}
                  </p>
                  <div className="flex items-center gap-1 my-2">
                    {[...Array(5).keys()].map((star) => (
                      <div key={star}>
                        <FaStar className="text-widget" />
                      </div>
                    ))}
                  </div>
                  {product?.specialPrice ? (
                    <div className="flex items-center flex-wrap product-center gap-1 lg:gap-5">
                      <span className="text-[#047857] font-semibold">
                        {`${numberWithCommas(
                          parseInt(product?.specialPrice)
                        )}TK`}
                      </span>
                      <span className="line-through font-semibold text-sm text-primary">{`${numberWithCommas(
                        parseInt(product?.price)
                      )}TK`}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[#047857] font-semibold">
                        {`${numberWithCommas(parseInt(product?.price))}TK`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      )}
    </div>
  );
};

MostReviewProducts.propTypes = {
  sellerId: PropTypes.string,
};

export default MostReviewProducts;
