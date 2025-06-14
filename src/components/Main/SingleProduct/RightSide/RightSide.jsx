import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaAngleRight,
  FaExclamationCircle,
  FaHeart,
  FaMinus,
  FaMoneyBillAlt,
  FaPlus,
  FaTruck,
} from "react-icons/fa";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import { FaBasketShopping } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { PiKeyReturnFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  add_to_cart,
  decreament,
  increament,
} from "../../../../store/main/features/cart/userCartSlice";
import { useGetCart } from "../../../../hooks/useGetCart";
import { useGetWishlist } from "../../../../hooks/useGetWishlist";
import { add_to_wishlist } from "../../../../store/main/features/wishlist/wishlistSlice";
import CommonModal from "../../../Modals/CommonModal";
import ReturnPolicy from "./ReturnPolicy";
import toast from "react-hot-toast";

const RightSide = ({ product }) => {
  const [buyQnt, setBuyQnt] = useState(1);
  const [returnModal, setReturnModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userCart } = useGetCart();
  const { userWishlist } = useGetWishlist();

  const handleIncreament = () => {
    if (product?.stock == buyQnt) {
      toast.error(`Can not add more than ${product?.stock} quantity`, {
        id: "stock_error",
      });
    } else {
      setBuyQnt((prev) => prev + 1);
      dispatch(increament(product?._id));
    }
  };

  const handleDecreament = () => {
    if (buyQnt >= 2) setBuyQnt((prev) => prev - 1);
    dispatch(decreament(product?._id));
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
      buyQnt,
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
      buyQnt,
      stock: product?.stock,
      brand: product?.brand,
      deliveryCharge: product?.deliveryCharge??0,
    };
    dispatch(add_to_wishlist(wishlistData));
  };

  const handleBuyNow = () => {
    const price = product?.specialPrice
      ? product?.specialPrice
      : product?.price;

    const isExist = userCart?.find((cart) => cart?._id === product?._id);
    if (isExist) {
      navigate("/dashboard/checkout");
    } else {
      const cartData = {
        title: product?.title,
        price,
        sellerId: product?.sellerId,
        _id: product?._id,
        image: product?.productImages?.[0],
        buyQnt,
        stock: product?.stock,
        brand: product?.brand,
        deliveryCharge: product?.deliveryCharge??0,
      };
      dispatch(add_to_cart(cartData));
      navigate("/dashboard/checkout");
    }
  };

  useEffect(() => {
    const added = userCart?.find((cart) => cart?._id === product?._id);
    if (added) {
      setBuyQnt(added?.buyQnt);
    }
  }, [product, userCart]);

  return (
    <div>
      <div>
        {/* Product short description */}
        <div className="flex flex-col gap-5 pt-5">
          <h1 className="font-semibold text-xl">{product?.title}</h1>
          <div className="flex items-center gap-2 text-sm flex-wrap w-full">
            {product?.specialPrice ? (
              <p className="shadow border py-1 px-4 rounded-full text-slate">
                {`Price : `}
                <span className="font-bold text-stech">
                  {numberWithCommas(parseInt(product?.specialPrice))}TK
                </span>
              </p>
            ) : null}
            <p className="shadow border py-1 px-4 rounded-full text-slate">
              {`Regular Price : `}
              <span className="font-bold text-stech">
                {numberWithCommas(parseInt(product?.price))}TK
              </span>
            </p>
            <p className="shadow border py-1 px-4 rounded-full text-slate">
              {`Stock : `}
              <span className="font-bold text-stech">
                {product?.stock > 0 ? "In" : "Out"}
              </span>
            </p>
            <p className="shadow border py-1 px-4 rounded-full text-slate">
              {`Brand : `}
              <span className="font-bold text-stech">{product?.brand}</span>
            </p>
          </div>
          <hr />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3">
          {/* Product key features */}
          <div className="flex flex-col gap-3 pt-3">
            <h2 className="font-bold">Key Features</h2>
            <div className="flex flex-col gap-2">
              {product?.keyFeatures?.slice(0, 4)?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-[15px]"
                >
                  <FaAngleRight />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product price */}
          <div className="flex items-center gap-5">
            {product?.specialPrice ? (
              <>
                <span className="font-semibold text-xl text-[#047857]">{`${numberWithCommas(
                  parseInt(product?.specialPrice)
                )}TK`}</span>
                <span className="line-through font-semibold text-xl text-primary">{`${numberWithCommas(
                  parseInt(product?.price)
                )}TK`}</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-xl text-accent">{`${numberWithCommas(
                  parseInt(product?.price)
                )}TK`}</span>
              </>
            )}
          </div>

          {/* Update product buyQnt button */}
          <div className="grid grid-cols-2 gap-5 items-center justify-between">
            <div className="grid grid-cols-3 border items-center text-center rounded">
              <button onClick={handleDecreament} className="p-3">
                <FaMinus />
              </button>
              <input
                className="focus:outline-none text-center "
                value={buyQnt}
                readOnly
              />
              <button onClick={handleIncreament} className="p-3">
                <FaPlus />
              </button>
            </div>
            <div>
              <button
                onClick={handleBuyNow}
                disabled={product?.stock == 0}
                className="py-2 text-center text-white font-semibold bg-[#047857] w-full rounded disabled:bg-gray-400"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* View store ,wishlist, add to card button */}
          <div className="flex gap-5 w-full">
            <div className="flex items-center justify-between gap-5 w-full">
              <FaBasketShopping
                onClick={product?.stock > 0 ? handleCart : null}
                className={`border text-xl w-full p-2.5 h-10 rounded cursor-pointer ${
                  userCart?.find((cart) => cart?._id === product?._id)
                    ? "bg-[#047857] text-white"
                    : null
                }`}
              />
              <FaHeart
                onClick={handleWishlist}
                className={`border text-xl w-full p-2.5 h-10 rounded cursor-pointer ${
                  userWishlist?.find((list) => list?._id === product?._id)
                    ? "bg-[#047857] text-white"
                    : null
                }`}
              />
            </div>
            <Link
              to={`/single-store/${product?.sellerId}`}
              className="font-semibold w-full rounded bg-stech text-white"
            >
              <button className="py-2 font-semibold w-full rounded bg-widget text-white">
                View Store
              </button>
            </Link>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-[#f3f4f8] px-5 py-3 flex flex-col gap-3 text-[15px]">
          <div className="flex items-center justify-between gap-5">
            <span>Delivery</span>
            <FaExclamationCircle />
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <FaTruck />
                <span>Free Delivery</span>
              </div>
              <span className="text-[#047857] font-medium capitalize">
                {product?.freeDeliveryAvailable}
              </span>
            </div>
            <span className="bg-white p-2 rounded">
              Enjoy free shipping promotion with minimum spend of TK 499 from
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <FaMoneyBillAlt />
              <span>
                Cash on Delivery{" "}
                {product?.cashOnDeliveryAvailable === "yes"
                  ? "available"
                  : "not available"}
              </span>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between gap-5">
            <span>Service</span>
            <FaExclamationCircle />
          </div>
          <div>
            <div className="flex items-center gap-3 text-violet-900">
              <AiFillSafetyCertificate />
              <span>100% Authentic from Trusted Brand</span>
            </div>
          </div>
          <div>
            {product?.returnProductAvailable === "yes" ? (
              <div className="flex items-center gap-3 text-violet-900">
                <PiKeyReturnFill />
                <span>{product?.returnDays} Days free & easy return</span>
                <span
                  onClick={() => setReturnModal(true)}
                  className="text-danger underline cursor-pointer"
                >
                  Read
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 text-violet-900">
                  <PiKeyReturnFill />
                  <span>10 Days free & easy return</span>
                </div>
                <span className="text-xs">Change of mind is not available</span>
              </>
            )}
          </div>
        </div>
      </div>
      {returnModal && (
        <CommonModal
          isOpen={returnModal}
          onClose={setReturnModal}
          title={"Return policy"}
          key={"return_policy"}
          className={
            "w-[330px] max-h-[600px] md:w-[600px] lg:w-[800px] lg:max-h-[450px]"
          }
        >
          <ReturnPolicy sellerId={product?.sellerId} key={"policy_modal"} />
        </CommonModal>
      )}
    </div>
  );
};

RightSide.propTypes = {
  product: PropTypes.object,
};
export default RightSide;
