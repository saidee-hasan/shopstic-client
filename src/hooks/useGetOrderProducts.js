import { useAddress } from "./useAddress";
import { useGetCart } from "./useGetCart";
import { useGetUser } from "./useGetUser";

export const useGetOrderProducts = ({ paymentMethod }) => {
  const { userCart } = useGetCart();
  const { selectedAddress } = useAddress();
  const { user } = useGetUser();
  const orderItems = [];
  const sellerIds = [];

  userCart?.map((cart) => {
    if (!sellerIds.includes(cart?.sellerId)) {
      sellerIds.push(cart?.sellerId);
      orderItems.push({
        userInfo: user,
        shippingAddress: selectedAddress,
        paymentMethod,
        productsInfo: [cart],
        sellerId: cart?.sellerId,
        userId: user?._id,
        deliveryCharge: parseInt(cart?.deliveryCharge) ?? 0,
      });
    } else {
      const existSellerProduct = orderItems?.find(
        (product) => product?.sellerId === cart?.sellerId
      );
      existSellerProduct?.productsInfo?.push(cart);
      existSellerProduct.deliveryCharge += parseInt(cart?.deliveryCharge) ?? 0;
    }
  });
  return orderItems;
};
