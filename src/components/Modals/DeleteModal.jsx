import { FaQuestionCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import CommonModal from "./CommonModal";
import SubmitButton from "../Common/SubmitButton";
import Button from "../Common/Button";

const DeleteModal = ({
  setIsModalOpen,
  isModalOpen,
  isLoading,
  handleDeleteFunction,
  deleteData,
}) => {
  const handleDelete = async () => {
    try {
      const result = await handleDeleteFunction(deleteData);

      if (result.error) {
        toast.error("Something went wrong 😓", { id: "error" });
      } else {
        toast.success("Deleted successfully", { id: "delete_success" });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  return (
    <div>
      <CommonModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        isOutsideClick={false}
        className="w-[330px]"
      >
        <div className="flex flex-col items-center justify-center gap-5 w-full">
          <div className="flex flex-col gap-5 items-center justify-center">
            <FaQuestionCircle className="text-7xl text-accent" />
            <h1 className="text-lg text-center font-bold text-white">
              Are your sure you want to delete?
            </h1>
          </div>

          <div className="flex items-center justify-center w-full gap-2">
            <Button
              className="bg-danger"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Cancel
            </Button>
            <SubmitButton
              onClick={handleDelete}
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              Sure
            </SubmitButton>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

DeleteModal.propTypes = {
  setIsModalOpen: PropTypes.func,
  handleDeleteFunction: PropTypes.func,
  isModalOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  deleteData: PropTypes.any,
};

export default DeleteModal;