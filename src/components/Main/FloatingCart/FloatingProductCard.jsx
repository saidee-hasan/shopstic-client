import PropTypes from "prop-types";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  decreament,
  increament,
  remove_cart,
} from "../../../store/main/features/cart/userCartSlice";
import toast from "react-hot-toast";

import { numberWithCommas } from "../../../utils/numberWithComma";
const FloatingProductCard = ({ product }) => {
  const dispatch = useDispatch();

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
    <div className="p-5 border-b flex flex-col gap-2">
      <div className="flex gap-3">
        <img className="w-10 h-10" src={product?.image} alt="" />
        <span className="text-sm">{product?.title}</span>
        <div className="w-3 h-3">
          <FaTrash
            className="hover:text-danger cursor-pointer duration-300 "
            onClick={() => dispatch(remove_cart(product?._id))}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-3 font-medium">
          <span>
            {numberWithCommas(parseInt(Math.round(product?.price)))}TK
          </span>
          <span>X</span>
        </div>

        <div className="flex border items-center justify-between text-center rounded w-32">
          <button
            onClick={() => dispatch(decreament(product?._id))}
            className="p-2"
          >
            <FaMinus />
          </button>
          <input
            className="focus:outline-none text-center w-full"
            value={product?.buyQnt}
            readOnly
          />
          <button onClick={handleIncreament} className="p-2">
            <FaPlus />
          </button>
        </div>
        <div className="flex items-center gap-3 font-medium ">
          <span>=</span>
          <span>
            {numberWithCommas(
              Math.round(parseInt(product?.price) * parseInt(product?.buyQnt))
            )}
            TK
          </span>
        </div>
      </div>
    </div>
  );
};
FloatingProductCard.propTypes = {
  product: PropTypes.object,
};
export default FloatingProductCard;
