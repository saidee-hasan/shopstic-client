import {
  FaAddressCard,
  FaExclamationCircle,
  FaHeart,
  FaReply,
  FaShoppingBag,
  FaShoppingBasket,
  FaStar,
  FaThumbsUp,
  FaUserCircle,
} from "react-icons/fa";
import { MdWindow } from "react-icons/md";

export const layout = {
  left_side: [
    {
      name: "Dashboard",
      icon: <MdWindow />,
      link: "/dashboard",
    },
    {
      name: "Order",
      icon: <FaShoppingBag />,
      link: "order",
    },
    {
      name: "Edit Profile",
      icon: <FaUserCircle />,
      link: "edit-profile",
    },
    {
      name: "Address",
      icon: <FaAddressCard />,
      link: "address",
    },
    {
      name: "Wishlist",
      icon: <FaHeart />,
      link: "wishlist",
    },
    {
      name: "My Cart",
      icon: <FaShoppingBasket />,
      link: "my-cart",
    },
    {
      name: "My Reviews",
      icon: <FaStar />,
      link: "my-reviews",
    },
    {
      name: "My Report",
      icon: <FaExclamationCircle />,
      link: "my-report",
    },
    {
      name: "Feedback",
      icon: <FaThumbsUp />,
      link: "feedback",
    },
    {
      name: "Back to main website",
      icon: <FaReply />,
      link: "/",
    },
  ],
};
