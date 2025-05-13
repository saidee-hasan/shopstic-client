import ReportTable from "../../../components/Dashboard/Pages/Report/ReportTable";

const Report = () => {
  return (
    <div>
      <div className="p-5 flex flex-col gap-5 ">
        <div>
          <span className="font-bold text-xl text-white">Report</span>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <ReportTable />
        </div>
      </div>
    </div>
  );
};

export default Report;
