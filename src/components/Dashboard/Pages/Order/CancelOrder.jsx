import { useState } from "react";
import PropTypes from "prop-types";
import { FcCancel } from "react-icons/fc";
import toast from "react-hot-toast";
import CommonModal from "../../../Modals/CommonModal";
import Button from "../../../Common/Button";
import SubmitButton from "../../../Common/SubmitButton";
import { useUpdateOrderMutation } from "../../../../store/dashboard/service/order/orderApi";
import failedImage from "../../../../assets/Dashboard/sadface.png";

const CancelOrder = ({ item }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderCancel, { isLoading, isError }] = useUpdateOrderMutation();

  const handleCancel = async () => {
    try {
      const res = await orderCancel({
        _id: item?._id,
        data: { userId: item?.userId, email:item?.userInfo?.email, status: "cancelled" },
      });
      if (!res?.error) {
        toast.success("Order cancelled successfully", { id: "order_cancel" });
        setIsCancelModalOpen(false);
      }
    } catch (error) {
      toast.success("Something went wrong 😓", { id: error });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span
          onClick={() => setIsCancelModalOpen(true)}
          title="Cancel order"
          className="text-stech cursor-pointer text-center w-8 h-8 rounded-full"
        >
          <FcCancel className="w-full h-full" />
        </span>
      </div>

      {isCancelModalOpen && (
        <CommonModal
          isOpen={isCancelModalOpen}
          onClose={setIsCancelModalOpen}
          title={"Cancel order"}
          key={"order_manage"}
          className={"w-[330px]"}
        >
          <div className="flex flex-col gap-5">
            {!isError ? (
              <h1 className="text-lg  text-white text-center font-bold">
                {`Are your sure you want to cancel? This can't be undone.`}
              </h1>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <img className="w-20" src={failedImage} alt="sadface" />
                  <span className="font-bold text-danger">Request Failed</span>
                  <span className="text-sm text-center text-white">
                    Your request has failed due to some technical error please
                    try again later
                  </span>
                </div>
              </div>
            )}

            {!isError && (
              <div className="flex items-center justify-center w-full gap-2">
                <Button
                  className="bg-danger"
                  onClick={() => setIsCancelModalOpen((prev) => !prev)}
                >
                  Cancel
                </Button>
                <SubmitButton
                  isLoading={isLoading}
                  onClick={handleCancel}
                  loadingText="Canceling..."
                  className=""
                >
                  Sure
                </SubmitButton>
              </div>
            )}
          </div>
        </CommonModal>
      )}
    </div>
  );
};

CancelOrder.propTypes = {
  item: PropTypes.object,
};
export default CancelOrder;
