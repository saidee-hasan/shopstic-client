import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import CommonModal from "../../../Modals/CommonModal";
import AddressForm from "./AddressForm";

const UpdateAddress = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <span
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="text-[#047857] cursor-pointer border border-[#047857] text-center p-2 rounded-full"
        title="View"
      >
        <FaEdit />
      </span>

      {isModalOpen && (
        <CommonModal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          title={"Update Address"}
          key={"update_address"}
          className="w-[330px] md:w-[500px]"
        >
          <AddressForm
            updateData={item}
            key={"update_address"}
            setIsModalOpen={setIsModalOpen}
          />
        </CommonModal>
      )}
    </>
  );
};

UpdateAddress.propTypes = {
  item: PropTypes.object,
};

export default UpdateAddress;
