import PropTypes from "prop-types";
import { useState } from "react";
import { FaBinoculars } from "react-icons/fa6";
import CommonModal from "../../../Modals/CommonModal";
import OrderView from "./OrderView";

const View = ({ item }) => {
  const [isView, setIsView] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          title="Order Overview"
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
          title={"Order overview"}
          key={"order_manage"}
          className={
            "w-[330px] max-h-[600px] md:w-[600px] lg:w-[800px] lg:max-h-[450px]"
          }
        >
          <OrderView orderInfo={item} />
        </CommonModal>
      )}
    </>
  );
};

View.propTypes = {
  item: PropTypes.object,
};
export default View;
