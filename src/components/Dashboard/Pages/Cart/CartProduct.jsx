import { FaHeart, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  decreament,
  increament,
  remove_cart,
} from "../../../../store/main/features/cart/userCartSlice";
import { useGetWishlist } from "../../../../hooks/useGetWishlist";
import { add_to_wishlist } from "../../../../store/main/features/wishlist/wishlistSlice";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import toast from "react-hot-toast";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { userWishlist } = useGetWishlist();

  const handleIncreament = () => {
    if (product?.stock == product?.buyQnt) {
      toast.error(`Can not add more than ${product?.stock} quantity`, {
        id: "stock_error",
      });
    } else {
      dispatch(increament(product?._id));
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 bg-widget rounded-md shadow-md  text-white p-5">
        <div className="flex items-center flex-wrap md:flex-nowrap gap-3">
          <div>
            <img className="w-20" src={product?.image} alt="product_image" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm" title={product?.title}>
              {product?.title?.length > 30
                ? `${product?.title.slice(0, 50)}...`
                : product?.title}
            </span>
            <span className="font-bold text-sm">
              {numberWithCommas(parseInt(Math.round(product?.price)))}TK
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 -mt-5">
          <div
            onClick={() => dispatch(add_to_wishlist(product))}
            className={`flex items-center justify-center cursor-pointer w-7 h-7 border rounded-full p-1 hover:bg-danger hover:text-white duration-300 ${
              userWishlist?.find((list) => list?._id === product?._id)
                ? "text-danger"
                : null
            }`}
          >
            <FaHeart />
          </div>
          <div
            onClick={() => dispatch(remove_cart(product?._id))}
            className="flex items-center justify-center cursor-pointer w-7 h-7 border rounded-full p-1 hover:bg-danger hover:text-white duration-300"
          >
            <FaTrashAlt />
          </div>
        </div>

        <div className="flex items-center border rounded-md -mt-5">
          <Button
            onClick={() => dispatch(decreament(product?._id))}
            className="p-2 flex items-center justify-center border-0 rounded-sm bg-transparent text-stech hover:bg-stech hover:text-white duration-300"
          >
            <FaMinus className="text-white" />
          </Button>
          <Input
            className="text-center w-10 rounded-none bg-transparent p-1"
            value={product?.buyQnt}
            readOnly
          />
          <Button
            onClick={handleIncreament}
            className=" p-2 flex items-center justify-center border-0 rounded-sm bg-transparent text-stech hover:bg-stech hover:text-white duration-300"
          >
            <FaPlus className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.object,
};

export default CartProduct;
