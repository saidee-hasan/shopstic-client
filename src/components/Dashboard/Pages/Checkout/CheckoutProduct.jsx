import PropTypes from "prop-types";
import { numberWithCommas } from "../../../../utils/numberWithComma";
const CheckoutProduct = ({ product }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 bg-widget rounded-md shadow-md text-white p-5 w-full">
        <div className="flex items-center flex-wrap md:flex-nowrap gap-3 w-full">
          <div>
            <img className="w-20" src={product?.image} alt="product_image" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm" title={product?.title}>
                {product?.title?.length > 30
                  ? `${product?.title.slice(0, 50)}...`
                  : product?.title}
              </span>
              <span className="text-xs font-bold">
                {numberWithCommas(parseInt(Math.round(product?.price)))}TK
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="font-bold">{`Brand : ${product?.brand}`}</span>
              <span>{`item's ( ${product?.buyQnt}) Subtotal: ${numberWithCommas(
                Math.round(parseInt(product?.price) * parseInt(product?.buyQnt))
              )}TK`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutProduct.propTypes = {
  product: PropTypes.object,
};
export default CheckoutProduct;
