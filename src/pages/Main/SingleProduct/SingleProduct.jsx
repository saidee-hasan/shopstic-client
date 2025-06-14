import { useLocation } from "react-router-dom";
import Product from "../../../components/Main/SingleProduct/Product";
import Tabs from "../../../components/Main/SingleProduct/Tabs/Tabs";
import { smoothScroll } from "../../../utils/scrollToTop";
import { useUpdateViewsMutation } from "../../../store/main/service/product/productApi";
import { useEffect, useRef } from "react";

const SingleProduct = () => {
  smoothScroll();
  const location = useLocation();
  const product = location?.state?.payload;
  const [updateViews] = useUpdateViewsMutation();
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (!hasUpdated.current) {
      const updateProductViews = async () => {
        await updateViews({ _id: product?._id });
      };
      updateProductViews();
    }
  }, [updateViews, product]);

  return (
    <section>
      <div>
        <Product product={product} />
      </div>
      <div className="my_container">
        <Tabs product={product} />
      </div>
    </section>
  );
};

export default SingleProduct;
