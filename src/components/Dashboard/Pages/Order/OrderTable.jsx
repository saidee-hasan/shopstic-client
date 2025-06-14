import { useState } from "react";
import moment from "moment";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Table from "../../../Common/Table";
import { useGetOrderQuery } from "../../../../store/dashboard/service/order/orderApi";
import { useGetUser } from "../../../../hooks/useGetUser";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import { numberWithCommas } from "../../../../utils/numberWithComma";
import View from "./View";
import CancelOrder from "./CancelOrder";
import ManageReview from "./ManageReview";
import Pagination from "../../../Common/Pagination";
import PropTypes from "prop-types";

const OrderTable = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useGetUser();

  const query = new URLSearchParams({
    userId: user?._id,
    email: user?.email,
    page: currentPage,
    search,
  }).toString();

  const { data, isLoading } = useGetOrderQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / 10);

  return (
    <div className="overflow-x-auto">
      {!isLoading ? (
        <div className="p-4 bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="p-2">Images</th>
                <th className="p-2">Order ID</th>
                <th className="p-2">Payment Method</th>
                <th className="p-2">Order Status</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Total</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">
                    <div className="flex gap-2">
                      <PhotoProvider>
                        {item.productsInfo?.map((product) => (
                          <figure key={product._id}>
                            <PhotoView src={product.image}>
                              <div className="p-1 w-10 h-10 rounded border cursor-pointer">
                                <img
                                  className="object-cover w-full h-full"
                                  src={product.image}
                                  alt="product_gallery_image"
                                />
                              </div>
                            </PhotoView>
                          </figure>
                        ))}
                      </PhotoProvider>
                    </div>
                  </td>
                  <td className="p-2">#{item.orderId}</td>
                  <td className="p-2">{item.paymentMethod}</td>
                  <td className="p-2 capitalize">{item.status}</td>
                  <td className="p-2">
                    {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td className="p-2 font-medium">
                    {numberWithCommas(
                      item.productsInfo?.reduce(
                        (total, p) => total + p.buyQnt * p.price,
                        0
                      ) + parseInt(item.deliveryCharge ?? 0)
                    )}{" "}
                    TK
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <View item={item} />
                      {item.status === "completed" ? (
                        <ManageReview item={item} />
                      ) : (
                        item.status !== "cancelled" && (
                          <CancelOrder item={item} />
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            key={"user_order_pagination"}
            className="justify-end p-4"
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

OrderTable.propTypes = {
  search: PropTypes.string,
};

export default OrderTable;
