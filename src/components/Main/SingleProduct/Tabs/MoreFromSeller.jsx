import PropTypes from "prop-types";
import { useGetProductsQuery } from "../../../../store/main/service/product/productApi";
import ProductCard from "../../../Common/ProductCard";
import { FaSpinner } from "react-icons/fa";
const MoreFromSeller = ({ sellerId, productId }) => {
  const { data, isLoading } = useGetProductsQuery(sellerId);
  const products = data?.filter((product) => product?._id !== productId);
  return (
    <div>
      {!isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      )}
    </div>
  );
};
MoreFromSeller.propTypes = {
  sellerId: PropTypes.string,
  productId: PropTypes.string,
};
export default MoreFromSeller;
