import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import customSliderBullets from "../../../utils/customSliderBullets";
import { FaEnvelope, FaPlayCircle } from "react-icons/fa";
import { useGetUser } from "../../../hooks/useGetUser";
import CommonModal from "../../Modals/CommonModal";
import ReportForm from "./ReportForm";
import ReactPlayer from "react-player";
import { useDefaultBannerQuery } from "../../../store/shop/service/banner/bannerApi";
import BannerSkeleton from "../../Skeleton/Shop/Banner/BannerSkeleton";
import PropTypes from "prop-types";

const SingleShopBanner = ({ sellerId }) => {
  const [reportModal, setReportModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useGetUser();

  const { data, isLoading } = useDefaultBannerQuery(sellerId);
  const handleNavigate = () => {
    navigate("/sign-in", { state: { from: location }, replace: true });
  };

  return (
    <>
      {!isLoading ? (
        <div className="mt-[80px] lg:mt-24 xl:mt-[100px]">
          <div className="h-full lg:grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-3 h-full w-full border-b-2 mt-5 lg:mt-0 hidden lg:block">
              <div className="h-full w-full bg-white">
                <div className="flex flex-col items-center justify-between h-full w-full pt-16">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      className="w-32 h-32 border-4 rounded-full border-accent"
                      src={data?.store?.logo}
                      alt="shop_logo"
                    />
                    <h2 title={data?.store?.businessName} className="font-bold text-3xl text-black uppercase">
                      {data?.store?.businessName?.length > 10
                        ? `${data?.store?.businessName?.slice(0, 10)}...`
                        : data?.store?.businessName}
                    </h2>
                    <div className="flex items-center gap-2 text-lg font-bold">
                      <FaEnvelope className="text-base" />
                      <span>Chat Now</span>
                    </div>
                    <div className="flex items-center gap-3  bg-danger px-3 py-1 text-white rounded-full">
                      <FaPlayCircle className=" animate-ping" />
                      <span>Live</span>
                    </div>
                    <span className="px-10 pb-5 xl:px-16 w-full text-center font-semibold">
                      85% Positive Store Rating
                    </span>
                  </div>
                  <div className="border-t w-full flex flex-col items-center justify-center">
                    <button
                      className="w-full p-3 text-primary font-semibold text-lg"
                      onClick={
                        !user?._id ? handleNavigate : () => setReportModal(true)
                      }
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {
              <div className="w-full bg-white h-full col-span-full lg:col-span-9 border-r-4 border-b-4">
                {data?.banner?.type === "image" ? (
                  <Swiper
                    autoplay={{
                      delay: 6000,
                      disableOnInteraction: false,
                    }}
                    style={customSliderBullets()}
                    loop={true}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="h-[220px] md:h-[360px] lg:h-[460px]"
                  >
                    {data?.banner?.bannerImages?.map((banner) => (
                      <SwiperSlide key={banner} className="h-full">
                        <div className="h-full">
                          <img
                            className="h-full w-full object-fill"
                            src={banner}
                            alt="banner_image"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="flex justify-center items-center w-full">
                    <ReactPlayer
                      url={data?.banner?.videoURL}
                      controls
                      width="100%"
                      height="460px"
                    />
                  </div>
                )}
              </div>
            }
          </div>
          {reportModal && (
            <CommonModal
              isOpen={reportModal}
              onClose={setReportModal}
              title={"Report to admin"}
              key={"report"}
              className={"w-[450px]"}
            >
              <ReportForm setReportModal={setReportModal} />
            </CommonModal>
          )}
        </div>
      ) : (
        <BannerSkeleton />
      )}
    </>
  );
};

SingleShopBanner.propTypes = {
  sellerId: PropTypes.string,
};

export default SingleShopBanner;
