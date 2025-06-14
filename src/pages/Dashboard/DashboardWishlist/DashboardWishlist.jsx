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
    <div className="p-5">
      {userWishlist?.length ? (
        <div className="flex flex-col gap-5">
          {userWishlist?.map((product) => (
            <div key={product?._id}>
              <div className="flex items-center justify-between gap-4 bg-widget rounded-md shadow-md text-white p-5">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      className="w-20"
                      src={product?.image}
                      alt="product_image"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm" title={product?.title}>
                      {product?.title?.length > 30
                        ? `${product?.title.slice(0, 50)}...`
                        : product?.title}
                    </span>
                    <span className="font-bold text-sm">
                      {numberWithCommas(parseInt(Math.round(product?.price)))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 -mt-5">
                  <div
                    onClick={() => dispatch(add_to_cart(product))}
                    className={`flex items-center justify-center cursor-pointer w-7 h-7 border rounded-full p-1 hover:bg-danger hover:text-white duration-300`}
                  >
                    <FaShoppingBasket />
                  </div>
                  <div
                    onClick={() => dispatch(remove_wishlist(product?._id))}
                    className="flex items-center justify-center cursor-pointer w-7 h-7 border rounded-full p-1 hover:bg-danger hover:text-white duration-300"
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-5 flex-col items-center justify-center w-full h-80 bg-widget rounded-md shadow-md">
          <FaClipboard className="text-8xl text-slate" />
          <span className="font-medium text-xl text-accent capitalize">
            No data found
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardWishlist;
