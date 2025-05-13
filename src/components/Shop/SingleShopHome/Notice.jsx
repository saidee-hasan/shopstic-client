import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import { useSellerAnnouncmentQuery } from "../../../store/shop/service/announcement/announcementApi";
import NoticeSkeleton from "../../Skeleton/Shop/Notice/NoticeSkeleton";
const Notice = ({ sellerId }) => {
  const { data, isLoading } = useSellerAnnouncmentQuery(sellerId);
  return (
    <>
      {!isLoading ? (
        <div className="bg-white p-4 rounded-full my-10 border-b-2">
          <Marquee>
            {data?.announcement ? (
              <span className="font-semibold">{data?.announcement}</span>
            ) : (
              <span>Notice not available at this moment !</span>
            )}
          </Marquee>
        </div>
      ) : (
        <NoticeSkeleton />
      )}
    </>
  );
};

Notice.propTypes = {
  sellerId: PropTypes.string,
};
export default Notice;
