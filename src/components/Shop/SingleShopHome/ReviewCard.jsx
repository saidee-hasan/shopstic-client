import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import moment from "moment";

const ReviewCard = ({ data }) => {
  return (
    <div className="flex flex-col bg-white p-5 rounded-md border">
      <div>
        <div className="flex items-center gap-5">
          <img
            className="w-12 h-12 rounded-full"
            src={data?.userInfo?.photo}
            alt="user_image"
          />
          <span className="font-bold">
            {data?.userInfo?.fName + " " + data?.userInfo?.lName}{" "}
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 font-bold">
              {[...Array(data?.rating?.rating).keys()].map((key) => (
                <FaStar className="text-accent" key={key} />
              ))}
              <span>{data?.rating?.rating}</span>
            </div>
            <span className="text-sm font-medium">
              {`| ${moment(data?.createdAt).fromNow()}`}
            </span>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <p className="text font-medium">{data?.reviewMessage}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4 flex-wrap">
          {data?.productInfo?.map((product, index) => (
            <div key={index} className="">
              <img
                className="w-20 h-20"
                src={product?.image}
                alt="user_image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  data: PropTypes.object,
};
export default ReviewCard;
