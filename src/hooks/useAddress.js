import { useSelector } from "react-redux";

export const useAddress = () => {
  return useSelector((state) => state?.session?.userAddressReducer);
};
