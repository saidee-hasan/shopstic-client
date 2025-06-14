import { useState } from "react";
import { useGetCart } from "../../../../hooks/useGetCart";
import { useGetOrderProducts } from "../../../../hooks/useGetOrderProducts";
import { useCreateOrderMutation } from "../../../../store/dashboard/service/order/orderApi";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import SubmitButton from "../../../Common/SubmitButton";
import CommonModal from "../../../Modals/CommonModal";
import { useAddress } from "../../../../hooks/useAddress";
import toast from "react-hot-toast";
import sucessImage from "../../../../assets/Dashboard/order-confirmation.gif";
import failedImage from "../../../../assets/Dashboard/sadface.png";
import { Link } from "react-router-dom";
import Button from "../../../Common/Button";
import { FaCcMastercard, FaMoneyBillAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clear_cart } from "../../../../store/main/features/cart/userCartSlice";

const CheckoutPayment = () => {
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const { userCart } = useGetCart();
  const { selectedAddress } = useAddress();

  const total = userCart?.reduce((total, item) => {
    return (total += item?.buyQnt * item?.price);
  }, 0);

  const totalItem = userCart?.reduce((total, item) => {
    return (total += item?.buyQnt);
  }, 0);

  const shippingCost = userCart?.reduce((total, item) => {
    return (total += parseInt(item?.deliveryCharge) ?? 0);
  }, 0);

  const orderSummery = [
    {
      title: `Subtotal (${totalItem} items)`,
      value: numberWithCommas(parseInt(Math.round(total))),
    },
    {
      title: "Shipping Fee",
      value: numberWithCommas(parseInt(Math.round(shippingCost))),
    },
  ];

  const orderItems = useGetOrderProducts({ paymentMethod });

  const handleOrder = async () => {
    if (!selectedAddress?._id) {
      toast.error("Select delivery address", { id: "delivery address error" });
      return;
    }

    try {
      const res = await createOrder(orderItems);
      if (!res?.error) {
        setOrderSuccessModal(true);
        dispatch(clear_cart());
      } else {
        setOrderSuccessModal(true);
      }
    } catch {
      setOrderSuccessModal(true);
    }
  };

  return (
    <div
      className={`shadow-md bg-widget px-4 py-5 text-white rounded-md ${
        !orderSuccessModal && "sticky top-20"
      }`}
    >
      <p className="font-bold text-sm">Order Summary</p>
      <div className="flex flex-col gap-2 mt-2">
        {orderSummery.map(({ title, value }) => (
          <div
            className="font-semibold text-sm flex items-center justify-between"
            key={title}
          >
            <span>{title}</span>
            <span>TK {value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm pt-3 font-bold">
        <span>Total</span>
        <span>
          TK{" "}
          {numberWithCommas(
            parseInt(Math.round(total)) + parseInt(shippingCost)
          )}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <span className="font-medium text-sm">Payment options</span>
        <div className="grid grid-cols-2 gap-5">
          {["Cash On Delivery", "Online Payment"].map((option) => (
            <div
              onClick={() => setPaymentMethod(option)}
              key={option}
              className={` p-2 rounded-md cursor-pointer ${
                option === paymentMethod && "border-accent border"
              }`}
            >
              {option === "Cash On Delivery" ? (
                <div className="flex flex-col items-center justify-center">
                  <FaMoneyBillAlt className="text-6xl text-white" />
                  <span className="leading-none text-sm">{option}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FaCcMastercard className="text-6xl text-white" />
                  <span className="leading-none text-sm">{option}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Place order button */}
      <div className="mt-5">
        <SubmitButton
          isLoading={isLoading}
          className={"text-sm w-full hover:text-[15px] duration-500 uppercase"}
          onClick={handleOrder}
        >
          {`confirm order`}
        </SubmitButton>
      </div>

      {orderSuccessModal && (
        <CommonModal
          isOpen={orderSuccessModal}
          onClose={setOrderSuccessModal}
          title={isError ? "Failed order" : "Order successfull"}
          className="w-[330px] md:w-[500px]"
        >
          <div>
            {isError ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <img className="w-36" src={failedImage} alt="sadface" />
                <span className="font-bold text-danger">Order Failed</span>
                <span className="text-sm">
                  Your order has failed due to some technical error please try
                  again later
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <img className="w-44" src={sucessImage} alt="sadface" />
                <span className="font-bold text-[#047857]">
                  Thanks for your order
                </span>
                <span className="text-sm text-center">
                  Your order has been placed and is being processed You will
                  receive an email with the order details
                </span>
                <Link to={"/dashboard/order"}>
                  <Button className={"w-40 bg-transparent text-[#047857]"}>
                    View order
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CommonModal>
      )}
    </div>
  );
};

export default CheckoutPayment;
