import { Link } from "react-router-dom";
import CheckoutTop from "../../../components/Dashboard/Pages/Checkout/CheckoutTop";
import { useGetCart } from "../../../hooks/useGetCart";
import Button from "../../../components/Common/Button";
import CheckoutProduct from "../../../components/Dashboard/Pages/Checkout/CheckoutProduct";
import CheckoutPayment from "../../../components/Dashboard/Pages/Checkout/CheckoutPayment";

const Checkout = () => {
  const { userCart } = useGetCart();
  return (
    <div className="grid p-5 grid-cols-1 md:grid-cols-12 gap-5">
      <div className="flex flex-col gap-5 md:col-span-8">
        <CheckoutTop />
        <div>
          {userCart?.length ? (
            userCart?.map((product) => (
              <div key={product?.productId} className="mb-4">
                <CheckoutProduct product={product} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center  justify-center">
              <span className="text-center text-xl font-bold py-10 text-accent">{`There are no product (0)`}</span>
              <Link to="/" target="_self">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-4">
        <CheckoutPayment />
      </div>
    </div>
  );
};

export default Checkout;
