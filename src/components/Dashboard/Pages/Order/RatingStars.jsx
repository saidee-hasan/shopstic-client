import { FaStar } from "react-icons/fa";

export const RatingStars = ({ rating, setRating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`cursor-pointer ${
          i <= rating.rating ? "text-primary" : "text-gray-300"
        }`}
        onClick={() => {
          setRating((prevRating) => ({
            ...prevRating,
            rating: i,
          }));
        }}
      >
        <FaStar className="text-xl" />
      </span>
    );
  }
  return stars;
};
