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
    <header className="w-full sticky top-0 bg-widget z-50 p-3">
      <nav className="flex items-center justify-between px-8 w-full">
        <div>
          <FaBars
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="block lg:hidden  text-2xl text-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer block lg:hidden"
            onClick={() => setAdminMessageModal((prev) => !prev)}
          >
            <div>
              <FaBell className="text-4xl bg-gray-100 p-2 rounded-full" />
            </div>
            {!MessageLoading && (
              <>
                {todayMessages?.length ? (
                  <div className="absolute -top-2 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
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
            className="relative cursor-pointer block lg:hidden"
          >
            <div>
              <MdQuestionAnswer className="text-4xl bg-gray-100 p-2 rounded-full" />
            </div>
            <>
              {!isClicked && showSize ? (
                <div className="absolute -top-1 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
                  <span>{showSize}</span>
                </div>
              ) : showSize ? (
                <div className="absolute -top-1 w-5 h-5 bg-accent flex flex-col items-center justify-center rounded-full text-white">
                  <span>{showSize}</span>
                </div>
              ) : null}
            </>
          </div>

          <div className="flex items-center gap-3">
            <Link to={"/dashboard"}>
              <FaHome className="text-4xl bg-gray-100 p-2 rounded-full" />
            </Link>
            {user?.photo ? (
              <div className="bg-gray-100 w-10 h-10 border p-1 rounded-full flex flex-col items-center justify-center">
                <img
                  src={user?.photo}
                  alt="personal_image"
                  className="h-full w-full rounded-full"
                />
              </div>
            ) : (
              <FaUserCircle className="text-4xl bg-gray-100 p-2 rounded-full" />
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
