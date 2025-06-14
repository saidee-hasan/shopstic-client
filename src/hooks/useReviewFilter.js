import { useSelector } from "react-redux";

export const useReviewFilter = () => {
  return useSelector((state) => state?.session?.userReviewFilterReducer);
};
