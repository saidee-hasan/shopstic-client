import { useState } from "react";
import { FaGrinHearts, FaRegFutbol, FaRegStar, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import CommonModal from "../../../Modals/CommonModal";
import {
  useCreateReviewMutation,
  useGetReviewByOrderIdQuery,
} from "../../../../store/dashboard/service/review/reviewApi";
import toast from "react-hot-toast";
import RatingComponent from "./RatingComponent";
import TextArea from "../../../Common/TextArea";
import SubmitButton from "../../../Common/SubmitButton";

const ManageReview = ({ item }) => {
  const [rating, setRating] = useState(0);
  const [addReviewModal, setAddReviewModal] = useState(false);

  const query = new URLSearchParams({
    orderId: item?.orderId,
    email: item?.userInfo?.email,
  }).toString();

  const { data, isLoading: reviewLoading } = useGetReviewByOrderIdQuery(query);

  const [addReview, { isLoading, isSuccess }] = useCreateReviewMutation();

  const handleReview = async (event) => {
    event.preventDefault();
    const form = event.target;
    const productIds = item?.productsInfo?.map((info) => {
      return {
        productId: info?._id,
        image: info?.image,
      };
    });
    const reviewData = {
      rating,
      reviewMessage: form.reviewMessage?.value,
      userId: item?.userId,
      sellerId: item?.sellerId,
      productInfo: productIds,
      orderId: item?.orderId,
      userInfo: item?.userInfo,
    };
    try {
      const res = await addReview(reviewData);
      if (res?.error) {
        setAddReviewModal(false);
        toast.error("Something went wrong 😓", { id: "review_error" });
      }
    } catch (error) {
      setAddReviewModal(false);
      toast.error("Something went wrong 😓", { id: error });
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          disabled={data?._id ? true : false}
          title="Add review"
          onClick={() => setAddReviewModal((prev) => !prev)}
          className="cursor-pointer border border-[#047857] text-center p-2 rounded-full disabled:text-danger"
        >
          {!reviewLoading ? (
            <>
              {!data?._id ? (
                <FaRegStar />
              ) : (
                <FaStar className="text-accent cursor-not-allowed" />
              )}
            </>
          ) : (
            <FaRegFutbol className="animate-spin" />
          )}
        </button>
      </div>

      {addReviewModal && (
        <CommonModal
          isOpen={addReviewModal}
          onClose={setAddReviewModal}
          title={!isSuccess ? "Add review" : null}
          key={"review_manage"}
          className={"w-[400px]"}
        >
          {!isSuccess ? (
            <form onSubmit={handleReview} className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-5 w-full">
                <RatingComponent
                  rating={rating}
                  setRating={setRating}
                  title="Product rating"
                  key={"rating"}
                />
              </div>
              {rating ? (
                <div className="flex flex-col gap-5">
                  <TextArea
                    name="reviewMessage"
                    required
                    key={"review-message"}
                    className="bg-[#1C2822] text-white rounded-sm w-full h-28"
                    placeholder="Write review message here..."
                  />
                  <SubmitButton isLoading={isLoading}>Save</SubmitButton>
                </div>
              ) : null}
            </form>
          ) : (
            <div className="flex flex-col gap-5 items-center justify-center">
              <FaGrinHearts className="text-8xl text-[#047857]" />
              <span className="text-center font-medium text text-white">
                Thanks a ton for sharing your thoughts! Your feedback means the
                world to us.
              </span>
            </div>
          )}
        </CommonModal>
      )}
    </>
  );
};

ManageReview.propTypes = {
  item: PropTypes.object,
};
export default ManageReview;
