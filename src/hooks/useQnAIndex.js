import { useSelector } from "react-redux";

export const useQnA = () => {
  return useSelector((state) => state?.local?.userqnaReducer?.value);
};
