import PropTypes from "prop-types";
import { useGetReviewByProductIdQuery } from "../../../../store/main/service/review/mainReviewApi";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import { FaClipboard } from "react-icons/fa";
import ReviewCard from "../../../Shop/SingleShopHome/ReviewCard";
import { useState } from "react";
import Pagination from "../../../Common/Pagination";
const Reviews = ({ productId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const query = new URLSearchParams({
    productId,
    page: currentPage,
  }).toString();

  const { data, isLoading } = useGetReviewByProductIdQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / 10);

  return (
    <>
      {!isLoading ? (
        <div>
          <div className="bg-gray-100 p-2">
            <p className="font-medium mb-5">{`Reviews about this product (${data?.total})`}</p>
          </div>
          {data?.data?.length ? (
            <div className="flex flex-col gap-5">
              {data?.data?.map((review) => (
                <ReviewCard key={review?._id} data={review} />
              ))}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
                key={"review_pagination"}
              />
            </div>
          ) : (
            <div className="flex gap-5 flex-col items-center justify-center w-full h-80 bg-white">
              <FaClipboard className="text-8xl text-slate" />
              <span className="font-medium text-xl text-accent capitalize">
                No data found
              </span>
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string,
};

export default Reviews;
