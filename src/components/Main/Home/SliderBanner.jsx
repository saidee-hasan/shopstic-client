import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ReactPlayer from "react-player";

import { Pagination, Autoplay } from "swiper/modules";
import customSliderBullets from "../../../utils/customSliderBullets";
import { useDefaultAdminBannerQuery } from "../../../store/main/service/adminBanner/adminBannerApi";
import AdminBannerSkeleton from "../../Skeleton/Main/AdminBanner/AdminBannerSkeleton";
import { useGetCategoriesQuery } from "../../../store/main/service/category/categoryApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FeatureProducts from "./FeatureProducts";
import FeaturedCategory from "./FeaturedCategory";

const SliderBanner = () => {
  const { data, isLoading } = useDefaultAdminBannerQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const navigate = useNavigate();

  const handleRedirect = (category) => {
    if (category) {
      navigate(
        `category-products?${category?.category
          ?.toLowerCase()
          ?.split(` `)
          ?.join("-")}`,
        {
          state: {
            payload: { ...category },
          },
        }
      );
    } else {
      toast.error("Data missing!. Please try again!", { id: "product_error" });
    }
  };

  return (
    <>
      {!isLoading && !categoriesLoading ? (
        <div className="mt-[80px] lg:mt-24 xl:mt-[100px]">
          <div className="h-full lg:grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-3 h-full w-full mt-5 lg:mt-0">
              <div className="p-4 h-[255px] md:h-[315px] lg:h-[525px] w-full lg:grid grid-cols-1 gap-5 overflow-y-auto bg-white border-b-2 bar-hidden hidden">
                <div className="flex flex-col gap-1.5">
                  {categories?.slice(0, 15)?.map((category) => (
                    <div
                      key={category?._id}
                      className="flex items-center gap-4 cursor-pointer hover:underline"
                      onClick={() => handleRedirect(category)}
                    >
                      <div className="w-7 h-7  border p-1 rounded-full">
                        <img
                          className="h-full w-full"
                          src={category?.image}
                          alt="category_image"
                        />
                      </div>
                      <span className="text-sm">{category?.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-full col-span-full lg:col-span-9">
              {data?.type === "image" ? (
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
                >
                  {data?.images?.map((banner) => (
                    <SwiperSlide key={banner}>
                      <div className="h-[255px] md:h-[315px] lg:h-[525px] w-full">
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
                    url={data?.videoURL}
                    controls
                    width="100%"
                    height="525px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <AdminBannerSkeleton />
      )}
      <FeaturedCategory categories={categories}/>
    </>
  );
};

export default SliderBanner;
