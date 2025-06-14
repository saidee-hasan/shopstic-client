import PropTypes from "prop-types";
import { useState } from "react";
import { FaBinoculars } from "react-icons/fa6";
import CommonModal from "../../../Modals/CommonModal";
import { FaStar } from "react-icons/fa";

const ViewReview = ({ item }) => {
  const [isView, setIsView] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          title="Review Overview"
          onClick={() => setIsView((prev) => !prev)}
          className="text-[#047857] cursor-pointer border border-[#047857] text-center p-2 rounded-full"
        >
          <FaBinoculars />
        </span>
      </div>

      {isView && (
        <CommonModal
          isOpen={isView}
          onClose={setIsView}
          title={"Review overview"}
          key={"order_manage"}
          className={"lg:w-[400px] w-[300px]"}
        >
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-1">
              {[...Array(item?.rating?.rating).keys()]?.map((rating) => (
                <FaStar key={rating} className="text-accent" />
              ))}
            </div>

            <div className="bg-widget text-white h-32 rounded-md p-3">
              <span>{item?.reviewMessage}</span>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

ViewReview.propTypes = {
  item: PropTypes.object,
};
export default ViewReview;
