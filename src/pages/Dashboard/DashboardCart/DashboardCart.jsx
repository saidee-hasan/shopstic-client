import { Link } from "react-router-dom";
import Button from "../../../components/Common/Button";
import CartPayment from "../../../components/Dashboard/Pages/Cart/CartPayment";
import CartProduct from "../../../components/Dashboard/Pages/Cart/CartProduct";
import CartTop from "../../../components/Dashboard/Pages/Cart/CartTop";
import { useGetCart } from "../../../hooks/useGetCart";

const DashboardCart = () => {
  const { userCart } = useGetCart();

  return (
    <div className="grid p-5 grid-cols-1 md:grid-cols-12 gap-5">
      <div className="flex flex-col gap-5 md:col-span-8">
        <CartTop />
        <div>
          {userCart?.length ? (
            userCart?.map((product) => (
              <div key={product?._id} className="mb-4">
                <CartProduct product={product} />
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
        <CartPayment />
      </div>
    </div>
  );
};

export default DashboardCart;
