import { FaBell, FaHome, FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { useGetUser } from "../../../hooks/useGetUser";
import { useQnA } from "../../../hooks/useQnAIndex";
import { handleIsClicked } from "../../../store/dashboard/features/QnA/qnaSlice";
import { useGetAdminMessageQuery } from "../../../store/dashboard/service/adminMessage/adminMessageApi";

import MobileSidebar from "../../Mobile/Dashboard/MobileSidebar";
import MessageList from "../Pages/AdminMessage/MessageList";

const Header = () => {
  const { user } = useGetUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminMessageModal, setAdminMessageModal] = useState(false);

  const { data: MessageData = [], isLoading: MessageLoading } =
    useGetAdminMessageQuery(user?.email);

  const todayMessages = MessageData.filter(
    (message) => message?.date === moment().format("L")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showSize } = useQnA();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <nav className="flex justify-between items-center px-4 py-2 bg-white sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <FaBars
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="block text-2xl text-gray-700 cursor-pointer lg:hidden"
        />

        <div className="flex gap-3 items-center">
          {/* Notifications */}
          <div
            className="block relative cursor-pointer lg:hidden"
            onClick={() => setAdminMessageModal((prev) => !prev)}
          >
            <FaBell className="text-3xl bg-gray-100 p-1.5 rounded-full" />
            {!MessageLoading && todayMessages.length > 0 && (
              <div className="flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-xs text-white rounded-full bg-accent">
                {todayMessages.length}
              </div>
            )}
          </div>

          {/* QnA */}
          <div
            className="block relative cursor-pointer lg:hidden"
            onClick={() => {
              dispatch(handleIsClicked());
              navigate("/dashboard/qna");
            }}
          >
            <MdQuestionAnswer className="text-3xl bg-gray-100 p-1.5 rounded-full" />
            {showSize > 0 && (
              <div className="flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-xs text-white rounded-full bg-accent">
                {showSize}
              </div>
            )}
          </div>

          {/* Home + User */}
          <div className="flex gap-2 items-center">
            <Link to="/dashboard">
              <FaHome className="text-3xl bg-gray-100 p-1.5 rounded-full" />
            </Link>
            {user?.photo ? (
              <div className="overflow-hidden w-9 h-9 bg-gray-100 rounded-full border">
                <img
                  src={user?.photo}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <FaUserCircle className="text-3xl bg-gray-100 p-1.5 rounded-full" />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isModalOpen && (
        <MobileSidebar
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          key="mobileSidebar"
          className="h-screen bg-white"
        />
      )}

      {/* Admin Messages */}
      {adminMessageModal && (
        <div className="fixed top-5 right-5 bg-white rounded shadow-lg lg:right-12">
          <MessageList
            isModalOpen={adminMessageModal}
            setIsModalOpen={setAdminMessageModal}
            messages={MessageData}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
