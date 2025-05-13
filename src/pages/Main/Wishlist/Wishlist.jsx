import { FaClipboard, FaHeart } from "react-icons/fa";
import { numberWithCommas } from "../../../utils/numberWithComma";
import Button from "../../../components/Common/Button";
import { useLocation } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { smoothScroll } from "../../../utils/scrollToTop";
import { useGetCart } from "../../../hooks/useGetCart";
import { useGetWishlist } from "../../../hooks/useGetWishlist";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  add_to_wishlist,
  remove_wishlist,
} from "../../../store/main/features/wishlist/wishlistSlice";
import {
  add_to_cart,
  remove_cart,
} from "../../../store/main/features/cart/userCartSlice";

const Wishlist = () => {
  const [products, setProducts] = useState();
  smoothScroll();
  const { pathname } = useLocation();
  const { userCart } = useGetCart();
  const { userWishlist } = useGetWishlist();

  const disptach = useDispatch();

  const handleWishlist = (product) => {
    const isExist = userWishlist?.find((list) => list?._id === product?._id);
    isExist?._id
      ? toast.error("Already added", { id: "wishlist" })
      : disptach(add_to_wishlist(product));
  };

  const handleAddToCart = (product) => {
    const isExist = userCart?.find((list) => list?._id === product?._id);
    isExist?._id
      ? toast.error("Already added", { id: "cart" })
      : disptach(add_to_cart(product));
  };

  useEffect(() => {
    if (pathname == "/cart") {
      setProducts(userCart);
    } else {
      setProducts(userWishlist);
    }
  }, [userWishlist, userCart, pathname]);

  return (
    <section className="flex flex-col items-center justify-center my-20 my_container">
      <div className="lg:w-8/12 min-h-[350px] bg-white mt-20 rounded-md shadow p-5">
        <div className="flex flex-col items-center justify-center gap-5">
          {pathname == "/cart" ? (
            <FaBagShopping className="text-6xl -mt-12 text-accent" />
          ) : (
            <FaHeart className="text-6xl -mt-12 text-accent" />
          )}
          <span className="font-bold text-4xl capitalize">
            {`${
              pathname == "/cart"
                ? `my cart (${products?.length})`
                : `my wishlist (${products?.length})`
            }`}
          </span>
        </div>
        {products?.length ? (
          <div className="mt-10">
            {products?.map((product) => (
              <div
                key={product?._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center border-t py-5"
              >
                <div className="flex items-center gap-5 lg:col-span-8">
                  <img
                    className="w-20 h-20"
                    src={product?.image}
                    alt="product_image"
                  />
                  <div className="flex flex-col gap-1">
                    <span title={product?.title}>
                      {product?.title?.length > 30
                        ? `${product?.title.slice(0, 50)}...`
                        : product?.title}
                    </span>
                    <div className="flex items-center gap-5">
                      <span className="font-semibold text text-[#047857]">{`${numberWithCommas(
                        product?.price
                      )}TK`}</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex w-full gap-2">
                  <Button
                    onClick={
                      pathname == "/cart"
                        ? () => handleWishlist(product)
                        : () => handleAddToCart(product)
                    }
                    className={"text-xs duration-500 py-3"}
                  >
                    {`${
                      pathname == "/cart"
                        ? `${
                            userWishlist?.find(
                              (list) => list?._id === product?._id
                            )
                              ? "Added"
                              : "Add to wishlist"
                          }`
                        : `${
                            userCart?.find((list) => list?._id === product?._id)
                              ? "Added"
                              : "Add to cart"
                          }`
                    }`}
                  </Button>
                  <Button
                    onClick={
                      pathname === "/cart"
                        ? () => disptach(remove_cart(product?._id))
                        : () => disptach(remove_wishlist(product?._id))
                    }
                    className={"text-xs bg-danger duration-500 py-3"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-5 flex-col items-center justify-center w-full h-80 bg-white">
            <FaClipboard className="text-8xl text-slate" />
            <span className="text-xl text-accent font-bold capitalize">
              No data found
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
