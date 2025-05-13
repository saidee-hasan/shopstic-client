import Table from "../../../Common/Table";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useGetReportQuery } from "../../../../store/shop/service/report/reportApi";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import ViewReport from "./ViewReport";

const ReportTable = () => {
  const { user } = useGetUser();

  const query = new URLSearchParams({
    id: user?._id,
    email: user?.email,
  }).toString();

  const { data, isLoading } = useGetReportQuery(query);

  return (
    <div className="overflow-hidden">
      {!isLoading ? (
        <Table
          className="font-normal"
          tableData={data}
          columns={[
            {
              name: "Title",
              render: ({ item }) => {
                return <span>{item?.report?.title}</span>;
              },
            },
            {
              name: "Report message",
              render: ({ item }) => {
                return (
                  <span title={item?.report?.reportMessage}>
                    {item?.report?.reportMessage?.length > 50
                      ? `${item?.report?.reportMessage?.slice(0, 50)}...`
                      : item?.report?.reportMessage}
                  </span>
                );
              },
            },
            {
              name: "Actions",
              render: ({ item }) => {
                return (
                  <div className="flex items-center gap-2">
                    <ViewReport item={item} />
                  </div>
                );
              },
            },
          ]}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ReportTable;
