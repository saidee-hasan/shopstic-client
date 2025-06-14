import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import { useGetReportedSellerQuery } from "../../../../store/shop/service/report/reportApi";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import { useGetUser } from "../../../../hooks/useGetUser";
const ViewReportContent = ({ item }) => {
  const { user } = useGetUser();
  const query = new URLSearchParams({
    email: user?.email,
    id: item?.againstTo,
  }).toString();

  const { data, isLoading } = useGetReportedSellerQuery(query);

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col gap-5">
          <div>
            <div className="p-7 h-44 w-44 bg-widget shadow-md rounded-md flex items-center justify-center overflow-hidden">
              {item ? (
                <div className="flex flex-col gap-3 items-center justify-center">
                  <img
                    className="w-full h-full rounded-full border border-stech"
                    src={data?.logo}
                    alt="user_photo"
                  />
                  <span className="font-bold text-white">
                    {data?.businessName}
                  </span>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col justify-center items-center">
                  <FaUserCircle className="w-44 h-44 rounded-full border p-5 border-accent text-[#047857]" />
                </div>
              )}
            </div>
          </div>
          <div className="shadow-md bg-widget rounded-md flex flex-col gap-5">
            <div className="p-5 rounded-md text-lg flex flex-col gap-5">
              <p className="font-bold">
                Title :{" "}
                <span className="font-medium text-sm text-white">
                  {item?.report?.title}
                </span>{" "}
              </p>
              <p className="font-bold">
                Message :{" "}
                <span className="font-normal text-sm text-white">
                  {item?.report?.reportMessage}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

ViewReportContent.propTypes = {
  item: PropTypes.object,
};

export default ViewReportContent;
