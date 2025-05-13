import PropTypes from "prop-types";
import { useState } from "react";
import { FaStreetView } from "react-icons/fa";
import CommonModal from "../../../Modals/CommonModal";
import ViewReportContent from "./ViewReportContent";
const ViewReport = ({ item }) => {
  const [reportModal, setReportModal] = useState(false);

  return (
    <>
      <span
        onClick={() => setReportModal(true)}
        className="text-[#047857] cursor-pointer border border-[#047857] text-center p-2 rounded-full"
        title="View"
      >
        <FaStreetView />
      </span>

      <div>
        {reportModal && (
          <CommonModal
            isOpen={reportModal}
            onClose={setReportModal}
            title={"View report"}
            className={"w-[330px] max-h-[600px] md:w-[600px] lg:w-[800px] lg:max-h-[450px]"}
          >
            <ViewReportContent item={item} />
          </CommonModal>
        )}
      </div>
    </>
  );
};

ViewReport.propTypes = {
  item: PropTypes.object,
};
export default ViewReport;
