import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import comma from "../../../assets/Main/Review/drop-red-bc80918e.svg";
import customSliderBullets from "../../../utils/customSliderBullets";
import { reviews } from "../../../data/review";
const ReviewCarousel = () => {
  return (
    <div className="mb-10 xl:mb-20 my_container">
      <div className="flex flex-col justify-center gap-2 items-center my-7 text-center">
        <h2 className="font-bold text-3xl">{`Customer Love`}</h2>
        <span>Get Your Desired Product from Featured Category!</span>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={customSliderBullets(15, "#abd006", "#2222228e", 15, 50, 5)}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <div>
          {reviews?.map(({ name, designation, reviewMessage }) => (
            <SwiperSlide key={name}>
              <div className="flex flex-col gap-5 border p-5 rounded-md h-full">
                <img className="w-8" src={comma} alt="drop_red" />
                <span>{reviewMessage}</span>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{name}</span>
                    <span className="text-lg italic font-medium">
                      {designation}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ReviewCarousel;
