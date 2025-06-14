import { FaBell, FaHome, FaUserCircle } from "react-icons/fa";
import { useGetUser } from "../../../hooks/useGetUser";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import MobileSidebar from "../../Mobile/Dashboard/MobileSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleIsClicked } from "../../../store/dashboard/features/QnA/qnaSlice";
import { MdQuestionAnswer } from "react-icons/md";
import { useQnA } from "../../../hooks/useQnAIndex";
import MessageList from "../Pages/AdminMessage/MessageList";
import { useGetAdminMessageQuery } from "../../../store/dashboard/service/adminMessage/adminMessageApi";
import moment from "moment";

const Header = () => {
  const { user } = useGetUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminMessageModal, setAdminMessageModal] = useState(false);

  const { data: MessageData, isLoading: MessageLoading } =
    useGetAdminMessageQuery(user?.email);

  const todayMessages = MessageData?.filter(
    (message) => message?.date === moment().format("L")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showSize, isClicked } = useQnA();

  return (
    <header className="sticky top-0 z-50 p-3 w-full bg-white">
      <nav className="flex justify-between items-center px-8 w-full">
        <div>
          <FaBars
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="block text-2xl text-white lg:hidden"
          />
        </div>
        <div className="flex gap-3 items-center">
          <div
            className="block relative cursor-pointer lg:hidden"
            onClick={() => setAdminMessageModal((prev) => !prev)}
          >
            <div>
              <FaBell className="p-2 text-4xl bg-gray-100 rounded-full" />
            </div>
            {!MessageLoading && (
              <>
                {todayMessages?.length ? (
                  <div className="flex absolute -top-2 flex-col justify-center items-center w-5 h-5 text-white rounded-full bg-accent">
                    <span>{todayMessages?.length}</span>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div
            onClick={() => {
              dispatch(handleIsClicked()), navigate("/dashboard/qna");
            }}
            className="block relative cursor-pointer lg:hidden"
          >
            <div>
              <MdQuestionAnswer className="p-2 text-4xl bg-gray-100 rounded-full" />
            </div>
            <>
              {!isClicked && showSize ? (
                <div className="flex absolute -top-1 flex-col justify-center items-center w-5 h-5 text-white rounded-full bg-accent">
                  <span>{showSize}</span>
                </div>
              ) : showSize ? (
                <div className="flex absolute -top-1 flex-col justify-center items-center w-5 h-5 text-white rounded-full bg-accent">
                  <span>{showSize}</span>
                </div>
              ) : null}
            </>
          </div>

          <div className="flex gap-3 items-center">
            <Link to={"/dashboard"}>
              <FaHome className="p-2 text-4xl bg-gray-100 rounded-full" />
            </Link>
            {user?.photo ? (
              <div className="flex flex-col justify-center items-center p-1 w-10 h-10 bg-gray-100 rounded-full border">
                <img
                  src={user?.photo}
                  alt="personal_image"
                  className="w-full h-full rounded-full"
                />
              </div>
            ) : (
              <FaUserCircle className="p-2 text-4xl bg-gray-100 rounded-full" />
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <MobileSidebar
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          key={"mobleSidebar"}
          className={"h-screen"}
        />
      )}

      {adminMessageModal && (
        <div className="fixed top-5 right-5 lg:right-12">
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
