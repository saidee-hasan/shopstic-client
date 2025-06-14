import { useSelector } from "react-redux";
export const useGetCart = () => {
  return useSelector((state) => state?.local?.userCartReducer);
};
