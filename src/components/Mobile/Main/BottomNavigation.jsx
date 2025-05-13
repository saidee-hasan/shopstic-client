import {
  FaHeart,
  FaShoppingBasket,
  FaStore,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetUser } from "../../../hooks/useGetUser";
import { useGetWishlist } from "../../../hooks/useGetWishlist";
import { useGetCart } from "../../../hooks/useGetCart";
const BottomNavigation = () => {
  const { user } = useGetUser();
  const { userWishlist } = useGetWishlist();
  const { userCart } = useGetCart();

  return (
    <div className="flex items-center bg-widget my_container py-3 justify-between gap-5  w-full fixed bottom-0 z-50 border-t xl:hidden">
      <Link to={"/cart"} className="flex flex-col items-center gap-y-2">
        <FaShoppingBasket className="text-xl text-white" />
        <span className="text-[#ffffff80]">{`Cart (${userCart?.length})`}</span>
      </Link>
      <Link to={"/wishlist"} className="flex flex-col items-center gap-y-2">
        <FaHeart className="text-xl text-white" />
        <span className="text-[#ffffff80]">{`Wishlist (${userWishlist?.length})`}</span>
      </Link>
      <Link to={"/store"} className="flex flex-col items-center gap-y-2">
        <FaStore className="text-xl text-white" />
        <span className="text-[#ffffff80]">All Store</span>
      </Link>
      {!user ? (
        <Link to="/sign-in" className="flex flex-col items-center gap-y-2">
          <FaUserCircle className="text-xl text-white" />
          <span className="text-[#ffffff80]">Account</span>
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 w-8 h-8 border rounded-full">
            <img
              src={user?.photo}
              alt="personal_image"
              className="h-full w-full rounded-full"
            />
          </div>
          <Link to={"/dashboard"} className="text-[#ffffff80]">
            Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
