import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/Main/MainLayout";
import Home from "../pages/Main/Home/Home";
import Login from "../components/Main/Login/Login";
import SignUp from "../pages/Main/Login/SignUp";
import NotFound from "../pages/Main/NotFound/NotFound";
import SingleProduct from "../pages/Main/SingleProduct/SingleProduct";
import Store from "../pages/Main/Store/Store";
import SingleShopHome from "../pages/Shop/SingleShopHome";
import Wishlist from "../pages/Main/Wishlist/Wishlist";
import Reviews from "../pages/Main/Reviews/Reviews";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";
import Address from "../pages/Dashboard/Address/Address";
import EditProfile from "../pages/Dashboard/EditProfile/EditProfile";
import Feedback from "../pages/Dashboard/Feedback/Feedback";
import Cart from "../pages/Dashboard/DashboardCart/DashboardCart";
import Review from "../pages/Dashboard/Review/Review";
import Order from "../pages/Dashboard/Order/Order";
import Report from "../pages/Dashboard/Report/Report";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardWishlist from "../pages/Dashboard/DashboardWishlist/DashboardWishlist";
import PrivateRouter from "./PrivateRouter";
import Checkout from "../pages/Dashboard/Checkout/Checkout";
import Pending from "../pages/Main/Panding/Pending";
import Block from "../pages/Main/Panding/Block";
import BlockedRouter from "./BlockedRouter";
import PendingRouter from "./PendingRouter";
import CategoryProduct from "../pages/Main/CategoryProduct/CategoryProduct";
import QnA from "../pages/Dashboard/QnA/QnA";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Wishlist />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "single-store/:id",
        element: <SingleShopHome />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "category-products",
        element: <CategoryProduct />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <DashboardLayout />
          </PrivateRouter>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRouter>
                <DashboardHome />
              </PrivateRouter>
            ),
          },
          {
            path: "address",
            element: (
              <PrivateRouter>
                <Address />
              </PrivateRouter>
            ),
          },
          {
            path: "qna",
            element: (
              <PrivateRouter>
                <QnA />
              </PrivateRouter>
            ),
          },
          {
            path: "edit-profile",
            element: (
              <PrivateRouter>
                <EditProfile />
              </PrivateRouter>
            ),
          },
          {
            path: "feedback",
            element: (
              <PrivateRouter>
                <Feedback />
              </PrivateRouter>
            ),
          },
          {
            path: "my-cart",
            element: (
              <PrivateRouter>
                <Cart />
              </PrivateRouter>
            ),
          },
          {
            path: "my-reviews",
            element: (
              <PrivateRouter>
                <Review />
              </PrivateRouter>
            ),
          },
          {
            path: "order",
            element: (
              <PrivateRouter>
                <Order />
              </PrivateRouter>
            ),
          },
          {
            path: "my-report",
            element: (
              <PrivateRouter>
                <Report />
              </PrivateRouter>
            ),
          },
          {
            path: "wishlist",
            element: (
              <PrivateRouter>
                <DashboardWishlist />
              </PrivateRouter>
            ),
          },
          {
            path: "checkout",
            element: (
              <PrivateRouter>
                <Checkout />
              </PrivateRouter>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "sign-in",
    element: <Login />,
  },
  {
    path: "blocked",
    element: (
      <BlockedRouter>
        <Block />
      </BlockedRouter>
    ),
  },
  {
    path: "pending",
    element: (
      <PendingRouter>
        <Pending />
      </PendingRouter>
    ),
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
