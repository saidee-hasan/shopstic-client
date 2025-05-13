import { Outlet, useLocation } from "react-router-dom";
import MainFooter from "../../components/Common/MainFooter";
import MainHeader from "../../components/Common/MainHeader";
import BottomNavigation from "../../components/Mobile/Main/BottomNavigation";
import FloatingCart from "../../components/Main/FloatingCart/FloatingCart";

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div
        style={{
          display: `${pathname?.startsWith("/dashboard") ? "none" : "block"}`,
        }}
      >
        <div>
          <MainHeader />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div
        style={{
          display: `${pathname?.startsWith("/dashboard") ? "none" : "block"}`,
        }}
      >
        <MainFooter />
        <div className="block xl:hidden">
          <BottomNavigation />
        </div>
      </div>

      <div
        style={{
          display: `${pathname?.startsWith("/dashboard") ? "none" : "block"}`,
        }}
      >
        <FloatingCart />
      </div>
    </div>
  );
};

export default MainLayout;
