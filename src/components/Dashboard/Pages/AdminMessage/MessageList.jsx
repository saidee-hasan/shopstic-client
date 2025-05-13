import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import CommonModal from "../../../Modals/CommonModal";

const MessageList = ({ messages = [], setIsModalOpen, isModalOpen }) => {
  const [seeMessageModal, setSeeMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsModalOpen, isModalOpen]);

  return (
    <div className="z-50 absolute right-0 top-14" ref={modalRef}>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-lg bg-[#1c2822] rounded-lg shadow-lg w-80 p-5">
          <div className="space-y-4 max-h-[400px] overflow-y-auto bar-hidden">
            {messages?.map((message) => (
              <div
                onClick={() => {
                  setSeeMessageModal((prev) => !prev),
                    setSelectedMessage(message);
                }}
                key={message?._id}
                className="p-4 border cursor-pointer border-gray-200 rounded-lg flex items-start space-x-3"
              >
                <div className="flex-shrink-0 mt-1 text-accent">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {message.title?.length > 30
                      ? `${message?.title?.slice(0, 30)}...`
                      : message?.title}
                  </p>
                  <p className="text-sm text-white">
                    {message.message?.length > 50
                      ? `${message?.message?.slice(0, 50)}...`
                      : message?.message}
                  </p>
                  <p className="text-xs text-white">{message.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {seeMessageModal && (
        <CommonModal
          isOpen={seeMessageModal}
          onClose={setSeeMessageModal}
          className={"w-[300px] md:w-[500px] max-h-[500px]"}
          title={selectedMessage?.title}
        >
          <div className="w-full h-full p-5 rounded-md bg-widget text-white">
            <span className="font-medium">{selectedMessage?.message} </span>
          </div>
        </CommonModal>
      )}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default MessageList;
