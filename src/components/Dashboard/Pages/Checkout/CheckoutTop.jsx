import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CheckoutAddress from "./CheckoutAddress";
import CommonModal from "../../../Modals/CommonModal";
import { useAddress } from "../../../../hooks/useAddress";
import Button from "../../../Common/Button";

const CheckoutTop = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { selectedAddress } = useAddress();

  return (
    <div className="flex items-center justify-between shadow-md bg-widget text-white px-3 py-3 rounded-md cursor-pointer">
      <div className="flex items-center gap-1 text-sm">
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="flex items-center gap-2 w-full">
            {!selectedAddress ? (
              <div
                className="flex items-center gap-2 w-full"
                onClick={() => setIsAddressModalOpen(true)}
              >
                <FaPlus />
                <span>Add delivery address</span>
              </div>
            ) : (
              <div className="text-xs flex flex-col gap-3">
                <div>
                  <p className="font-bold">
                    Delivery to :{" "}
                    <span className="font-normal">
                      {selectedAddress?.fullName}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-3">
                    {`${selectedAddress?.phoneNumber} | ${selectedAddress?.addressLine1}, ${selectedAddress?.country}, ${selectedAddress?.state},  ${selectedAddress?.city}`}
                    <Button
                      className="font-normal bg-transparent w-16 text-xs lowercase border-none text-accent"
                      onClick={() => setIsAddressModalOpen(true)}
                    >
                      Change
                    </Button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isAddressModalOpen && (
        <CommonModal
          isOpen={isAddressModalOpen}
          onClose={setIsAddressModalOpen}
          title={"Select delivery address"}
          className="w-[330px] max-h-[600px] md:w-[600px] lg:w-[800px] lg:max-h-[450px]"
        >
          <CheckoutAddress setIsAddressModalOpen={setIsAddressModalOpen} />
        </CommonModal>
      )}
    </div>
  );
};

export default CheckoutTop;
