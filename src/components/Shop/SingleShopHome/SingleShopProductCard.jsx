import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { numberWithCommas } from "../../../utils/numberWithComma";
import { GiShoppingBag } from "react-icons/gi";
import { FaHeart, FaSearch } from "react-icons/fa";
import ProductViewModal from "../../Modals/ProductViewModal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { add_to_cart } from "../../../store/main/features/cart/userCartSlice";
import { add_to_wishlist } from "../../../store/main/features/wishlist/wishlistSlice";
import { useGetCart } from "../../../hooks/useGetCart";
import { useGetWishlist } from "../../../hooks/useGetWishlist";

const SingleShopProductCard = ({ className, imageSize, product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userCart } = useGetCart();
  const { userWishlist } = useGetWishlist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleCart = () => {
    const price = product?.specialPrice
      ? product?.specialPrice
      : product?.price;

    const cartData = {
      title: product?.title,
      price,
      sellerId: product?.sellerId,
      _id: product?._id,
      image: product?.productImages?.[0],
      buyQnt: 1,
      stock: product?.stock,
      brand: product?.brand,
      deliveryCharge: product?.deliveryCharge??0,
    };
    dispatch(add_to_cart(cartData));
  };

  const handleWishlist = () => {
    const price = product?.specialPrice
      ? product?.specialPrice
      : product?.price;

    const wishlistData = {
      title: product?.title,
      price,
      sellerId: product?.sellerId,
      _id: product?._id,
      image: product?.productImages?.[0],
      buyQnt: 1,
      stock: product?.stock,
      brand: product?.brand,
      deliveryCharge: product?.deliveryCharge??0,
    };
    dispatch(add_to_wishlist(wishlistData));
  };

  return (
    <div className="h-full">
      <div
        className={cn(
          `rounded-xl p-3 lg:p-5 bg-white border-b-2 relative group h-full flex flex-col justify-between`,
          className
        )}
      >
        <div className="flex items-center justify-center">
          <img
            className={cn(
              `h-32 w-32 lg:h-52 lg:w-full group-hover:scale-105 duration-500`,
              imageSize
            )}
            src={product?.productImages?.[0]}
            alt="product_image"
          />
        </div>
        <div>
          <div onClick={() => handleRedirect(product)}>
            <p className="text-sm hover:underline hover:text-[#047857] cursor-pointer">
              {`${
                product?.title?.length > 50
                  ? `${product?.title?.slice(0, 50)}...`
                  : product?.title
              }`}
            </p>
          </div>
          {product?.specialPrice ? (
            <div className="flex flex-wrap items-center gap-1 lg:gap-5">
              <span className="text-[#047857] font-semibold">
                {`${numberWithCommas(product?.specialPrice)}TK`}
              </span>
              <span className="line-through font-semibold text-sm text-primary">{`${numberWithCommas(
                product?.price
              )}TK`}</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1 lg:gap-5">
              <span className="text-primary font-semibold">
                {`${numberWithCommas(product?.price)}TK`}
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-5 left-5 hidden xl:block">
          <div className="flex flex-col gap-3">
            <GiShoppingBag
              onClick={handleCart}
              className={`w-9 h-9 p-2 rounded-full  shadow-md border hover:bg-accent hover:text-white duration-500 cursor-pointer ${
                userCart?.find((cart) => cart?._id === product?._id)
                  ? "bg-[#047857] text-white"
                  : "bg-white"
              }`}
            />
            <FaHeart
              onClick={handleWishlist}
              className={`w-9 h-9 p-2 rounded-full  shadow-md border hover:bg-accent hover:text-white duration-500 cursor-pointer ${
                userWishlist?.find((list) => list?._id === product?._id)
                  ? "bg-[#047857] text-white"
                  : "bg-white"
              }`}
            />
            <FaSearch
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-9 h-9 p-2 rounded-full bg-white shadow-md border hover:bg-accent hover:text-white duration-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <ProductViewModal
          onClose={setIsOpen}
          isOpen={isOpen}
          productDetails={product}
        />
      )}
    </div>
  );
};

SingleShopProductCard.propTypes = {
  className: PropTypes.string,
  imageSize: PropTypes.string,
  product: PropTypes.object,
};

export default SingleShopProductCard;
