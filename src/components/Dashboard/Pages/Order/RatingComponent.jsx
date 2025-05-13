import PropTypes from "prop-types";
import { RatingStars } from "./RatingStars";

const RatingComponent = ({ rating, setRating, title }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-md font-semibold pb-3 capitalize text-center">
          {title} <span className="text-danger">*</span>
        </h3>
        <div className="flex space-x-2 items-center gap-2">
          <RatingStars rating={rating} setRating={setRating} />
        </div>
      </div>
    </div>
  );
};

RatingComponent.propTypes = {
  rating: PropTypes.object,
  setRating: PropTypes.func,
  title: PropTypes.string,
};
export default RatingComponent;
