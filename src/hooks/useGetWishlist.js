import { useSelector } from "react-redux";
export const useGetWishlist = () => {
  return useSelector((state) => state?.local?.userWishlistReducer);
};
