import { FaShoppingBasket } from "react-icons/fa";
import { useGetCart } from "../../../hooks/useGetCart";
import { useState } from "react";
import FloatingCartModal from "./FloatingCartModal";

const FloatingCart = () => {
  const { userCart } = useGetCart();
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState(false);

  return (
    <div>
      <div
        className="right-2 fixed flex bottom-24 xl:bottom-5 mr-2 z-40"
        onClick={() => setIsFloatingModalOpen((prev) => !prev)}
      >
        <div className="w-[60px] hidden md:block shadow-2xl  cursor-pointer duration-300 relative border-2 border-black rounded-md ">
          <div className="bg-widget flex justify-center items-center flex-col">
            <FaShoppingBasket size={30} color="white" />
            <p className="text-white text-[10px]">CART</p>
          </div>
          <span className="absolute -top-3 -right-2 bg-accent px-1.5 py-0.5 rounded-full text-sm text-white font-bold">
            {userCart?.length}
          </span>
        </div>
      </div>
      {isFloatingModalOpen && (
        <FloatingCartModal onClose={setIsFloatingModalOpen} />
      )}
    </div>
  );
};

export default FloatingCart;
