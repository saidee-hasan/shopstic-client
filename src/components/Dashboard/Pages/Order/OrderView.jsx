import PropTypes from "prop-types";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import Button from "../../../Common/Button";
import moment from "moment";
import { FaCcMastercard, FaMoneyBillAlt, FaTruck } from "react-icons/fa";

const OrderView = ({ orderInfo }) => {
  const totalItem = orderInfo?.productsInfo?.reduce((total, item) => {
    return (total += item?.buyQnt);
  }, 0);

  const totalCost = orderInfo?.productsInfo?.reduce((total, item) => {
    return (total += item?.buyQnt * item?.price);
  }, 0);

  const orderSummery = [
    {
      title: `Subtotal (${totalItem} items)`,
      value: numberWithCommas(parseInt(Math.round(totalCost))),
    },
    {
      title: "Shipping Fee",
      value: numberWithCommas(parseInt(Math.round(orderInfo?.deliveryCharge??0))),
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-md rounded-md p-5 bg-widget text-white">
        <div className="flex items-center gap-5 w-full">
          <h1 className="text-lg md:text-3xl font-bold">
            Order details {`#${orderInfo?.orderId}`}
          </h1>
          <Button
            className={
              "text-white py-1 px-5 uppercase font-bold w-32"
            }
          >
            {orderInfo?.status}
          </Button>
        </div>
        <p>
          Date: {moment(orderInfo?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>

      <div className="shadow-md rounded-md bg-widget">
        <div className="p-5 rounded-md">
          <div className="flex flex-col gap-5">
            {orderInfo?.productsInfo?.map((product) => (
              <div
                key={product?._id}
                className="grid grid-cols-12 items-center text-white"
              >
                <div className="col-span-8 flex flex-wrap xl:flex-nowrap items-center gap-5">
                  <img
                    src={product?.image}
                    className={"w-20 h-20 rounded-md"}
                  />
                  <h2>{product?.title}</h2>
                </div>

                <div className="col-span-4">
                  <p className="text-end font-medium">
                    <span>
                      {`${numberWithCommas(product?.price)} X ${
                        product?.buyQnt
                      } = ${numberWithCommas(
                        product?.price * product?.buyQnt
                      )}TK`}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="shadow-md rounded-md p-5 bg-widget text-white flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10  p-1">
              <FaTruck className="h-full w-full text-[#047857]" />
            </div>
            <span className="font-bold">Shipping info</span>
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                Name:{" "}
                <span className="font-normal">
                  {orderInfo?.shippingAddress?.fullName}
                </span>
              </p>
              <span>{`(+88) ${orderInfo?.shippingAddress?.phoneNumber}`}</span>
              <span className="font-bold">
                Address line1:{" "}
                <span className="font-normal">
                  {orderInfo?.shippingAddress?.addressLine1}
                </span>
              </span>
              <span className="font-bold">
                Address line2:{" "}
                <span className="font-normal">
                  {orderInfo?.shippingAddress?.addressLine2}
                </span>
              </span>
              <div className="flex items-center gap-4">
                <span className="font-bold">
                  Country:{" "}
                  <span className="font-normal">
                    {orderInfo?.shippingAddress?.country}
                  </span>
                </span>
                <span className="font-bold">
                  City:{" "}
                  <span className="font-normal">
                    {orderInfo?.shippingAddress?.city}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-md rounded-md p-5 bg-widget text-white">
          {orderInfo?.paymentMethod == "Cash On Delivery" ? (
            <div className="flex flex-col gap-1">
              <FaMoneyBillAlt className="text-4xl text-[#047857]" />
              <span className="leading-none text-sm font-bold">
                {`Payment Method : ( ${orderInfo?.paymentMethod} )`}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <FaCcMastercard className="text-4xl text-[#047857]" />
              <span className="leading-none text-sm font-bold">
                {`Payment Method : ( ${orderInfo?.paymentMethod} )`}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5">
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
                parseInt(Math.round(totalCost)) +
                  parseInt(
                    orderInfo?.deliveryCharge ?? 0
                  )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderView.propTypes = {
  orderInfo: PropTypes.object,
};

export default OrderView;
