import { Outlet } from "react-router-dom";
import LeftSide from "../../components/Dashboard/Layout/LeftSide";
import Header from "../../components/Dashboard/Header/Header";
import RightSide from "../../components/Dashboard/Layout/RightSide";

const DashboardLayout = () => {
  return (
    <div className="overflow-hidden bg-white">
      <div className="flex">
        {/* Left Sidebar - visible on large screens */}
        <div className="hidden lg:block">
          <LeftSide />
        </div>

        {/* Main Content Area */}
        <div className="w-full h-[calc(100vh)] overflow-y-auto bar-hidden">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>

        {/* Right Sidebar - visible on large screens */}
        <div className="hidden lg:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

