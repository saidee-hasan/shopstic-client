import { FaFutbol } from "react-icons/fa";
import { useGetReviewBySellerIdQuery } from "../../../store/main/service/review/mainReviewApi";
import ReviewCard from "./ReviewCard";
import PropTypes from "prop-types";
import SelectInput from "../../Common/SelectInput";
import { useState } from "react";
import Pagination from "../../Common/Pagination";

const SingleShopReviews = ({ sellerId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedValue, setSortedValue] = useState(1);

  const query = new URLSearchParams({
    limit: 10,
    sellerId,
    sortedValue,
    page: currentPage,
  });

  const { data, isLoading } = useGetReviewBySellerIdQuery({
    query: query.toString(),
  });

  const pages = Math.ceil(Math.abs(data?.total ?? 0) / 10);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col gap-5 mb-20">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">{`Seller reviews (${data?.total})`}</h2>
            <SelectInput
              defaultValue={sortedValue}
              onChange={(e) => setSortedValue(e.target.value)}
              className="border bg-white px-10"
            >
              <option value="1">Oldest</option>
              <option value="-1">Newest</option>
            </SelectInput>
          </div>
          {data?.data?.map((data) => (
            <ReviewCard key={data?._id} data={data} />
          ))}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            key={"single_store_review_pagination"}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10">
          <FaFutbol className="animate-spin text-4xl" />
          <span>Loading...</span>
        </div>
      )}
    </>
  );
};

SingleShopReviews.propTypes = {
  sellerId: PropTypes.string,
};

export default SingleShopReviews;
