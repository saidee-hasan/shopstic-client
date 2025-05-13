import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDeleteAddressMutation } from "../../../../store/dashboard/service/address/addressApi";
import DeleteModal from "../../../Modals/DeleteModal";
import PropTypes from "prop-types";

const DeleteAddress = ({ userId, _id, email }) => {
  const query = new URLSearchParams({
    userId,
    _id,
    email
  }).toString();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  return (
    <>
      <span
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full hover:bg-red-300 hover:text-white duration-300"
        title="Delete"
      >
        <FaTrash />
      </span>

      {isModalOpen && (
        <DeleteModal
          deleteData={query}
          handleDeleteFunction={deleteAddress}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          key={"delete_address"}
        />
      )}
    </>
  );
};

DeleteAddress.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  email:PropTypes.string
};

export default DeleteAddress;
