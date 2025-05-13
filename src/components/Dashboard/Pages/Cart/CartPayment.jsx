import { useNavigate } from "react-router-dom";
import { useGetCart } from "../../../../hooks/useGetCart";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import Button from "../../../Common/Button";
import toast from "react-hot-toast";

const CartPayment = () => {
  const { userCart } = useGetCart();
  const navigate = useNavigate();

  const total = userCart?.reduce((total, item) => {
    return (total += item?.buyQnt * item?.price);
  }, 0);

  const shippingCost = userCart?.reduce((total, item) => {
    return (total += parseInt(item?.deliveryCharge) ?? 0);
  }, 0);

  const totalItem = userCart?.reduce((total, item) => {
    return (total += item?.buyQnt);
  }, 0);

  const orderSummery = [
    {
      title: `Subtotal (${totalItem} items)`,
      value: numberWithCommas(parseInt(Math.round(total))),
    },
    { title: "Shipping Fee", value: numberWithCommas(parseInt(shippingCost)) },
  ];

  const handleNavigate = () => {
    if (!userCart?.length) {
      toast.error("Please add product", { id: "cart_error" });
    } else {
      navigate("/dashboard/checkout");
    }
  };

  return (
    <div className="shadow-md bg-widget text-white px-4 py-5 rounded-md sticky top-20">
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

      {/* Place order button */}
      <div className="mt-5">
        <Button
          className={"text-sm w-full hover:text-[15px] duration-500 uppercase"}
          onClick={handleNavigate}
        >
          {`proceed to checkout`}
        </Button>
      </div>
    </div>
  );
};

export default CartPayment;
