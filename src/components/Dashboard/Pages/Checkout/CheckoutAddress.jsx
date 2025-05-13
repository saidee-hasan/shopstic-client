import { FaCaretLeft, FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useGetAddressQuery } from "../../../../store/dashboard/service/address/addressApi";
import { useAddress } from "../../../../hooks/useAddress";
import { useDispatch } from "react-redux";
import { add_address } from "../../../../store/dashboard/features/address/addressSlice";
import LoadingSpinner from "../../../Common/LoadingSpinner";

const CheckoutAddress = ({ setIsAddressModalOpen }) => {
  const { user } = useGetUser();
  const dispatch = useDispatch();
  const { selectedAddress } = useAddress();

  const query = new URLSearchParams({
    userId: user?._id,
    email: user?.email,
  }).toString();

  const { data, isLoading } = useGetAddressQuery(query);

  return (
    <>
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data?.map((address) => (
            <div
              key={address?._id}
              className={`text-xs bg-widget flex flex-col gap-2 border ${
                selectedAddress?._id === address?._id ? "border-accent" : null
              } p-5 rounded-md relative overflow-hidden`}
              onClick={() => {
                dispatch(add_address(address)), setIsAddressModalOpen(false);
              }}
            >
              <span>{address?.fullName}</span>
              <span>{`(+88) ${address?.phoneNumber}`}</span>
              <span className="font-bold">
                Address line1:{" "}
                <span className="font-normal">{address?.addressLine1}</span>
              </span>
              <span className="font-bold">
                Address line2:{" "}
                <span className="font-normal">{address?.addressLine2}</span>
              </span>
              <div className="flex items-center gap-4">
                <span className="font-bold">
                  Country:{" "}
                  <span className="font-normal">{address?.country}</span>
                </span>
                <span className="font-bold">
                  City: <span className="font-normal">{address?.city}</span>
                </span>
              </div>
              {selectedAddress?._id === address?._id && (
                <div className="absolute -top-[19px] -left-[19px]  ">
                  <div className="relative">
                    <FaCaretLeft className="text-5xl rotate-45 text-accent" />
                    <div className="absolute top-[22px] left-[22px]">
                      <FaCheck className="text-white text-[8px]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

CheckoutAddress.propTypes = {
  setIsAddressModalOpen: PropTypes.func,
};
export default CheckoutAddress;
