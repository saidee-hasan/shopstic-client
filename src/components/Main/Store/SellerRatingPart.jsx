import { FaSpinner, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useGetReviewBySellerIdQuery } from "../../../store/main/service/review/mainReviewApi";
const SellerRatingPart = ({ seller }) => {
  const query = new URLSearchParams({
    sellerId: seller?._id,
    limit: 10,
    sortedValue: 1,
    page: 1,
  });

  const { data, isLoading } = useGetReviewBySellerIdQuery({
    query: query.toString(),
  });

  return (
    <div>
      <span className="font-semibold">Rating and reviews</span>
      <div className="flex items-center gap-1">
        <FaStar className="text-accent" />
        {!isLoading ? (
          <span className="font-semibold">{`(${data?.total} Reviews)`}</span>
        ) : (
          <FaSpinner className="animate-spin" />
        )}
      </div>
    </div>
  );
};

SellerRatingPart.propTypes = {
  seller: PropTypes.object,
};

export default SellerRatingPart;
