import { FaClipboard, FaShoppingBasket, FaTrashAlt } from "react-icons/fa";
import { useGetWishlist } from "../../../hooks/useGetWishlist";
import { useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/numberWithComma";
import { add_to_cart } from "../../../store/main/features/cart/userCartSlice";
import { remove_wishlist } from "../../../store/main/features/wishlist/wishlistSlice";

const DashboardWishlist = () => {
  const { userWishlist } = useGetWishlist();
  const dispatch = useDispatch();

  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      {userWishlist?.length ? (
        <div className="flex flex-col gap-5">
          {userWishlist?.map((product) => (
            <div
              key={product?._id}
              className="flex gap-4 justify-between items-center p-4 rounded-md border"
            >
              <div className="flex gap-3 items-center">
                <img
                  className="object-cover w-20 h-20 rounded border"
                  src={product?.image}
                  alt="product_image"
                />
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm font-medium text-gray-800"
                    title={product?.title}
                  >
                    {product?.title?.length > 30
                      ? `${product?.title.slice(0, 50)}...`
                      : product?.title}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {numberWithCommas(parseInt(Math.round(product?.price)))} TK
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => dispatch(add_to_cart(product))}
                  className="flex justify-center items-center w-8 h-8 text-gray-600 rounded-full border duration-300 hover:bg-primary hover:text-white"
                >
                  <FaShoppingBasket />
                </button>
                <button
                  onClick={() => dispatch(remove_wishlist(product?._id))}
                  className="flex justify-center items-center w-8 h-8 text-gray-600 rounded-full border duration-300 hover:bg-danger hover:text-white"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-80 bg-white rounded-md border">
          <FaClipboard className="text-8xl text-gray-400" />
          <span className="text-xl font-medium text-gray-600 capitalize">
            No data found
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardWishlist;
