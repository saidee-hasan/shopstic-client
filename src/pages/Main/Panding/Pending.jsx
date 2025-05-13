import { ImSpinner4 } from "react-icons/im";
import { TbReportSearch } from "react-icons/tb";
import { useGetUser } from "../../../hooks/useGetUser";
import Button from "../../../components/Common/Button";

const Pending = () => {
  const { user } = useGetUser();

  return (
    <div className="flex flex-col items-center justify-center h-svh bg-secondary">
      <div className="grid md:grid-cols-2 w-7/12 md:w-11/12 lg:w-9/12 xl:w-7/12 items-center justify-center">
        <div className="relative w-[350px]">
          <TbReportSearch className="text-[350px] text-white" />
          <span className="block absolute top-[226px] right-[79px] z-20">
            <ImSpinner4 className="text-6xl text-secondary spin" />
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-snug">{`👋 Hello, ${user?.fName+""+user?.lName}! Welcome to our platform.`}</h1>
          <span className="text-white text-lg">
            {`Your account is currently pending, and we'll notify you once it's fully activated.`}
          </span>
          <Button className="p-3 cursor-default">inreview</Button>
        </div>
      </div>
    </div>
  );
};

export default Pending;
