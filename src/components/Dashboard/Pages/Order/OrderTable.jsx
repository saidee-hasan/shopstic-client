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
    <div className="overflow-hidden">
      {!isLoading ? (
        <div>
          <Table
            className="font-normal"
            tableData={data?.data}
            columns={[
              {
                name: "Images",
                render: ({ item }) => {
                  return (
                    <div className="flex gap-2">
                      <PhotoProvider>
                        {item?.productsInfo?.map((product) => (
                          <figure key={product?._id}>
                            <PhotoView src={product?.image}>
                              <div className="border w-10 h-10 rounded p-1 cursor-pointer">
                                <img
                                  className="h-full w-full"
                                  src={product?.image}
                                  alt="product_gallery_image"
                                />
                              </div>
                            </PhotoView>
                          </figure>
                        ))}
                      </PhotoProvider>
                    </div>
                  );
                },
              },
              {
                name: "Order ID",
                render: ({ item }) => {
                  return (
                    <div>
                      <span>#{item?.orderId}</span>
                    </div>
                  );
                },
              },
              {
                name: "Payment Method",
                render: ({ item }) => {
                  return (
                    <div>
                      <span>{item?.paymentMethod}</span>
                    </div>
                  );
                },
              },
              {
                name: "Order Status",
                render: ({ item }) => {
                  return (
                    <div>
                      <span className="capitalize">{item?.status}</span>
                    </div>
                  );
                },
              },
              {
                name: "created At",
                render: ({ item }) => {
                  return (
                    <div>
                      <span className="capitalize">
                        {moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </div>
                  );
                },
              },
              {
                name: "Total",
                render: ({ item }) => {
                  return (
                    <div>
                      <span className="font-medium">
                        {numberWithCommas(
                          item?.productsInfo?.reduce((total, item) => {
                            return (total += item?.buyQnt * item?.price);
                          }, 0) +
                            parseInt(
                              item?.deliveryCharge ?? 0
                            )
                        )}
                        TK
                      </span>
                    </div>
                  );
                },
              },
              {
                name: "Actions",
                render: ({ item }) => {
                  return (
                    <div className="flex gap-3">
                      <View item={item} />
                      {item?.status === "completed" ? (
                        <ManageReview item={item} />
                      ) : (
                        item?.status !== "cancelled" && (
                          <CancelOrder item={item} />
                        )
                      )}
                    </div>
                  );
                },
              },
            ]}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            key={"user_order_pagination"}
            className="justify-end p-5"
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
