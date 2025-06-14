import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaSearch,
  FaShoppingBasket,
  FaUserCircle,
  FaStore,
} from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetCart } from "../../hooks/useGetCart";
import { useGetWishlist } from "../../hooks/useGetWishlist";
import GlobalSearch from "../Main/GlobalSearch/GlobalSearch";
import { useSearchProductQuery } from "../../store/main/service/product/productApi";

const MainHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useGetUser();
  const { userCart } = useGetCart();
  const { userWishlist } = useGetWishlist();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsModalOpen(!!value.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(inputValue.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const queryParams = {
    title: searchValue,
    limit: 10,
    page: 1,
  };

  const query = searchValue
    ? new URLSearchParams(queryParams).toString()
    : null;

  const { data, isLoading, isError } = useSearchProductQuery(query ?? null);

  const NavItem = ({ 
    to, 
    icon: Icon, 
    label, 
    subText, 
    count = 0, 
    showCount = true 
  }) => (
    <Link 
      to={to} 
      className="flex items-center gap-2 hover:opacity-80"
      aria-label={`${label}${showCount ? ` (${count} items)` : ''}`}
    >
      <Icon className="text-2xl xl:text-xl text-accent" />
      <div>
        <span className="text-gray-800">{label}</span>
        <p className="text-sm text-gray-600">
          {subText}{showCount ? ` (${count})` : ''}
        </p>
      </div>
    </Link>
  );

  return (
    <header className="bg-white fixed w-full z-50 top-0 shadow-sm">
      <div className="my_container py-3">
        <div className="grid xl:grid-cols-2 gap-10">
          {/* Logo and Search Section */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Dart Logo" 
                className="w-48 h-auto"
                loading="eager" 
              />
              <span className="sr-only">Dart</span>
            </Link>
            
            <div className="flex items-center justify-between bg-white w-full p-2 rounded-md relative border border-gray-200">
              <input
                onChange={handleChange}
                onFocus={handleChange}
                className="w-full focus:outline-none px-1 bg-transparent"
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={inputValue}
              />
              <button aria-label="Search products">
                <FaSearch className="text-gray-500" />
              </button>
              
              {isModalOpen && (
                <GlobalSearch
                  isLoading={isLoading}
                  isError={isError}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  data={data?.products || []}
                  searchQuery={inputValue}
                />
              )}
            </div>
          </div>

          {/* Navigation Links Section - Desktop */}
          <div className="hidden xl:flex items-center justify-between gap-5">
            <NavItem 
              to="/store" 
              icon={FaStore} 
              label="All Store" 
              subText="View Store"
              showCount={false}
            />
            
            <NavItem 
              to="/wishlist" 
              icon={FaHeart} 
              label="Wishlist" 
              subText="Items"
              count={userWishlist?.length || 0}
            />
            
            <NavItem 
              to="/cart" 
              icon={FaShoppingBasket} 
              label="My Cart" 
              subText="Items"
              count={userCart?.length || 0}
            />

            {/* User Account Section */}
            <div className="flex items-center gap-2">
              {!user ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-2xl xl:text-xl text-accent" />
                  <div>
                    <span className="text-gray-800">Account</span>
                    <div className="text-sm text-gray-600">
                      <Link 
                        to="/sign-up" 
                        className="hover:underline mr-1"
                        aria-label="Register"
                      >
                        Register
                      </Link>
                      <span>or</span>
                      <Link 
                        to="/sign-in" 
                        className="hover:underline ml-1"
                        aria-label="Login"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 hover:opacity-80"
                  aria-label="Dashboard"
                >
                  <MdWindow className="text-2xl xl:text-xl text-accent" />
                  <div>
                    <span className="text-gray-800">Dashboard</span>
                    <div className="text-sm text-gray-600">
                      Go to dashboard
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Seller Button */}
            <div className="p-3 rounded-sm flex items-center justify-center text-white bg-emerald-800 hover:bg-emerald-700 transition-colors">
              <a
                href="https://seller-center-32880.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
                aria-label="Create seller channel"
              >
                Create Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;