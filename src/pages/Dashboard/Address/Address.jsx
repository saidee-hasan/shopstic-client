import { useState } from "react";
import Button from "../../../components/Common/Button";
import AddressTable from "../../../components/Dashboard/Pages/Address/AddressTable";
import CommonModal from "../../../components/Modals/CommonModal";
import AddressForm from "../../../components/Dashboard/Pages/Address/AddressForm";

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div className="p-5 flex flex-col gap-5">
        <div className="grid grid-cols-2">
          <span className="font-bold text-xl text-white">Address</span>
          <div className="flex items-center gap-3 justify-end">
            <Button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-40"
            >
              Add new address
            </Button>
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <AddressTable />
        </div>
      </div>
      {isModalOpen && (
        <CommonModal
          title={"Add new delivery address"}
          className="w-[330px] md:w-[500px]"
          onClose={setIsModalOpen}
          isOpen={isModalOpen}
          key={"address"}
        >
          <AddressForm setIsModalOpen={setIsModalOpen} />
        </CommonModal>
      )}
    </section>
  );
};

export default Address;
