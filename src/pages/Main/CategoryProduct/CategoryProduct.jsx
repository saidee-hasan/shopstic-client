import { FaClipboard, FaFutbol } from "react-icons/fa";
import ProductCard from "../../../components/Common/ProductCard";
import CategoryFilterTop from "../../../components/Main/CategoryProduct/CategoryFilterTop";
import { useGetCategoryProductsQuery } from "../../../store/main/service/product/productApi";
import { smoothScroll } from "../../../utils/scrollToTop";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../components/Common/Pagination";

const CategoryProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortedValue, setSortedValue] = useState(1);

  smoothScroll();

  const location = useLocation();
  const categoryData = location.state.payload;

  const query = new URLSearchParams({
    limit,
    sortedValue,
    category: categoryData?.category,
    page: currentPage,
  }).toString();

  const { data, isLoading } = useGetCategoryProductsQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / parseInt(limit));
  console.log(data);

  return (
    <>
      {!isLoading ? (
        <div className="my_container my-[80px] lg:my-24 xl:my-[100px]">
          <CategoryFilterTop
            setLimit={setLimit}
            setSortedValue={setSortedValue}
          />
          {data?.data?.length ? (
            <div className={`${!data?.data?.length ? "h-screen" : null}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {data?.data?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
              <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                key={"category_product_pagination"}
              />
            </div>
          ) : (
            <div className="flex gap-5 flex-col items-center justify-center w-full h-80 bg-white">
              <FaClipboard className="text-8xl text-slate" />
              <span className="text-xl text-accent capitalize font-bold">
                No data found
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <FaFutbol className="text-6xl animate-spin" />
        </div>
      )}
    </>
  );
};

export default CategoryProduct;
