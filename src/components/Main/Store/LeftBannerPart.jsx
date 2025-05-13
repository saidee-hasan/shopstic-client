import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetSellerBannerQuery } from "../../../store/main/service/sellerBanner/sellerBannerApi";
import ReactPlayer from "react-player";
import { PhotoProvider, PhotoView } from "react-photo-view";

const LeftBannerPart = ({ seller }) => {
  const { data, isLoading } = useGetSellerBannerQuery(seller?._id);
  const getDefaultBanner = data?.find((banner) => banner?.default === true);
  const restBanner = data?.find((banner) => banner?.default !== true);

  return (
    <>
      {!isLoading ? (
        <div className="xl:col-span-4 flex flex-col gap-3">
          {getDefaultBanner?.type === "image" ? (
            <div className="h-60">
              <img
                className="rounded-md h-full w-full"
                src={getDefaultBanner?.bannerImages?.[0]}
                alt="store_image"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center w-full">
                <ReactPlayer
                  url={getDefaultBanner?.videoURL}
                  controls
                  width="100%"
                  height="240px"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 gap-5">
            {restBanner?.type == "image" ? (
              <PhotoProvider>
                {restBanner?.bannerImages?.map((image) => (
                  <figure key={image}>
                    <PhotoView src={image}>
                      <div className="border h-16 rounded p-1 cursor-pointer">
                        <img
                          className="h-full w-full"
                          src={image}
                          alt="product_gallery_image"
                        />
                      </div>
                    </PhotoView>
                  </figure>
                ))}
              </PhotoProvider>
            ) : (
              <PhotoProvider>
                {getDefaultBanner?.bannerImages?.map((image) => (
                  <figure key={image}>
                    <PhotoView src={image}>
                      <div className="border h-16 rounded p-1 cursor-pointer">
                        <img
                          className="h-full w-full"
                          src={image}
                          alt="product_gallery_image"
                        />
                      </div>
                    </PhotoView>
                  </figure>
                ))}
              </PhotoProvider>
            )}
          </div>
          <div>
            <Link to={`/single-store/${seller?._id}`}>
              <button className="text-center font-bold w-full bg-[#047857] text-white py-2.5 rounded-sm">
                <span>View Store</span>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="xl:col-span-4 flex flex-col gap-3">
          <div className="bg-gray-200 rounded-xl h-60 w-full animate-pulse"></div>

          <div className="grid grid-cols-4 gap-5">
            {[...Array(4).keys()].map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 rounded-xl h-16 w-full animate-pulse"
              ></div>
            ))}
          </div>

          <div>
            <div className="bg-gray-300 h-10 rounded-xl w-full animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
};

LeftBannerPart.propTypes = {
  seller: PropTypes.object,
};

export default LeftBannerPart;
