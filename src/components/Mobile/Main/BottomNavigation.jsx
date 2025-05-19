import {
  FaHeart,
  FaShoppingBasket,
  FaStore,
  FaUserCircle,
  FaHome,
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
    <nav className="flex items-center bg-white my_container py-3 justify-between gap-4 w-full fixed bottom-0 z-50 border-t border-gray-100 shadow-nav xl:hidden rounded-t-lg">
      
      {/* Home */}
      <Link 
        to="/" 
        className="flex flex-col items-center gap-y-1 group transition-all"
      >
        <div className="p-2 rounded-full bg-white group-hover:bg-gray-50 transition-colors">
          <FaHome className="text-xl text-gray-600 group-hover:text-blue-600" />
        </div>
        <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
          Home
        </span>
      </Link>

      {/* Cart */}
      <Link 
        to="/cart" 
        className="flex flex-col items-center gap-y-1 group relative transition-all"
      >
        <div className="p-2 rounded-full bg-white group-hover:bg-gray-50 transition-colors">
          <FaShoppingBasket className="text-xl text-gray-600 group-hover:text-blue-600" />
          {userCart?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {userCart?.length}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
          Cart
        </span>
      </Link>

      {/* Wishlist */}
      <Link 
        to="/wishlist" 
        className="flex flex-col items-center gap-y-1 group relative transition-all"
      >
        <div className="p-2 rounded-full bg-white group-hover:bg-gray-50 transition-colors">
          <FaHeart className="text-xl text-gray-600 group-hover:text-pink-600" />
          {userWishlist?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {userWishlist?.length}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-500 group-hover:text-pink-600 transition-colors">
          Wishlist
        </span>
      </Link>

      {/* Store */}
      <Link 
        to="/store" 
        className="flex flex-col items-center gap-y-1 group transition-all"
      >
        <div className="p-2 rounded-full bg-white group-hover:bg-gray-50 transition-colors">
          <FaStore className="text-xl text-gray-600 group-hover:text-green-600" />
        </div>
        <span className="text-xs font-medium text-gray-500 group-hover:text-green-600 transition-colors">
          Store
        </span>
      </Link>

      {/* Account */}
      {!user ? (
        <Link 
          to="/sign-in" 
          className="flex flex-col items-center gap-y-1 group transition-all"
        >
          <div className="p-2 rounded-full bg-white group-hover:bg-gray-50 transition-colors">
            <FaUserCircle className="text-xl text-gray-600 group-hover:text-purple-600" />
          </div>
          <span className="text-xs font-medium text-gray-500 group-hover:text-purple-600 transition-colors">
            Account
          </span>
        </Link>
      ) : (
        <div className="flex flex-col items-center gap-y-1 group">
          <div className="relative p-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="bg-white p-0.5 rounded-full">
              <img
                src={user?.photo}
                alt="personal_image"
                className="h-8 w-8 rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
          <Link 
            to="/dashboard" 
            className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors"
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default BottomNavigation;
