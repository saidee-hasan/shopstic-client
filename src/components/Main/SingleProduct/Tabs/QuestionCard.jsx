import { useEffect, useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { useGetProductQuestionsQuery } from "../../../../store/main/service/questions/questionsApi";
import PropTypes from "prop-types";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import { RiMessage2Fill, RiQuestionnaireFill } from "react-icons/ri";
import moment from "moment";
import Pagination from "../../../Common/Pagination";

const QuestionCard = ({ productId, setTotalQuestion }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const query = new URLSearchParams({
    productId,
    page: currentPage,
  }).toString();

  const { data, isLoading } = useGetProductQuestionsQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / 10);

  useEffect(() => {
    setTotalQuestion(data?.total);
  }, [setTotalQuestion, data]);

  return (
    <div>
      {!isLoading ? (
        <div>
          {!data?.data?.length ? (
            <div className="flex flex-col justify-center items-center">
              <div className="relative mt-2">
                <FaCommentAlt className="text-5xl text-gray-400" />
                <span className="absolute top-0 z-10 text-white text-4xl left-4">
                  ?
                </span>
              </div>
              <span className="text-center">
                There are no questions yet. <br /> Ask the seller now and their
                answer will show here.
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {data?.data?.map((question) => (
                <div
                  key={question?._id}
                  className="flex flex-col gap-5 bg-white p-5 border rounded-md"
                >
                  <div className="flex gap-3">
                    <div>
                      <RiQuestionnaireFill className="text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold">
                        {question?.question?.userQuestion}
                      </span>
                      <span className="text-sm font-medium">
                        {`${question?.question?.userInfo?.userName} | ${moment(
                          question?.createdAt
                        ).fromNow()}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <RiMessage2Fill className="text-2xl text-slate" />
                    </div>
                    {Object?.keys(question?.answer || {}).length ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {question?.answer?.answer}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm">No answer yet</span>
                    )}
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
                key={"product_question_pagination"}
              />
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

QuestionCard.propTypes = {
  productId: PropTypes.string,
  setTotalQuestion: PropTypes.func,
};

export default QuestionCard;
