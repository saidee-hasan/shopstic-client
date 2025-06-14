import PropTypes from "prop-types";
import cn from "../../utils/cn";
import { numberWithCommas } from "../../utils/numberWithComma";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ className, imageSize, product }) => {
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

  return (
    <div
      onClick={() => handleRedirect(product)}
      className={cn(
        `rounded-xl p-3 lg:p-5 bg-white border-b-2 relative cursor-pointer flex flex-col justify-between`,
        className
      )}
    >
      <div className="flex product-center justify-center">
        <img
          className={cn(`h-32 w-32 lg:h-52 lg:w-full`, imageSize)}
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

        {product?.specialPrice ? (
          <div className="flex items-center flex-wrap product-center gap-1 lg:gap-5">
            <span className="text-[#047857] font-semibold">
              {`${numberWithCommas(parseInt(product?.specialPrice))}TK`}
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
      <div className="absolute top-4 left-0">
        {product?.discount && (
          <span className="text-xs bg-accent text-white px-3 py-1 rounded-tr-xl rounded-br-xl">
            Save: {`${numberWithCommas(parseInt(product?.discount))}TK`}
          </span>
        )}
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  className: PropTypes.string,
  imageSize: PropTypes.string,
  product: PropTypes.object,
};
export default ProductCard;
