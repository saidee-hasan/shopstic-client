import { useState } from "react";
import moment from "moment";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useGetReviewsQuery } from "../../../../store/dashboard/service/review/reviewApi";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import Table from "../../../Common/Table";
import { FaStar } from "react-icons/fa";
import ViewReview from "./ViewReview";
import Pagination from "../../../Common/Pagination";
import PropTypes from "prop-types";

const ReviewTable = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useGetUser();

  const query = new URLSearchParams({
    userId: user?._id,
    email: user?.email,
    page: currentPage,
    search,
  }).toString();

  const { data, isLoading } = useGetReviewsQuery(query);
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
                        {item?.productInfo?.map((product) => (
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
                name: "Rating",
                render: ({ item }) => {
                  return (
                    <div className="flex gap-1 items-center">
                      {[...Array(item?.rating?.rating).keys()].map((rating) => (
                        <div key={rating}>
                          <FaStar className="text-accent" />
                        </div>
                      ))}
                    </div>
                  );
                },
              },
              {
                name: "Review Message",
                index: "reviewMessage",
                dataIndex: "reviewMessage",
              },
              {
                name: "Time",
                render: ({ item }) => {
                  return <div>{moment(item?.createdAt).format("LL")}</div>;
                },
              },
              {
                name: "Actions",
                render: ({ item }) => {
                  return (
                    <div className="flex gap-3">
                      <ViewReview item={item} />
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
            key={"user_review_pagination"}
            className="justify-end p-5"
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

ReviewTable.propTypes = {
  search: PropTypes.string,
};

export default ReviewTable;
