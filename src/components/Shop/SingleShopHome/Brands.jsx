import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import { useSellerBrandsQuery } from "../../../store/shop/service/brands/brandsApi";
import BrandsSkeleton from "../../Skeleton/Shop/Brands/BrandsSkeleton";

const Brands = ({ sellerId }) => {
  const { data, isLoading } = useSellerBrandsQuery(sellerId);

  return (
    <>
      {!isLoading ? (
        <div className="bg-widget p-5 mb-20">
          <div className="my_container">
            <div className="flex flex-col items-center justify-center text-white mb-3">
              <h2 className="font-bold text-lg">Top Brands</h2>
              <span>Meet our top brands!</span>
            </div>
            <div className="flex items-center gap-5">
              <Marquee>
                <div className="flex items-center gap-10">
                  {data?.map((brand) => (
                    <img
                      title={brand?.brandName}
                      key={brand?.brandName}
                      src={brand?.brandPhoto}
                      alt="brand_image"
                      className="w-28 mx-5"
                    />
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      ) : (
        <BrandsSkeleton />
      )}
    </>
  );
};

Brands.propTypes = {
  sellerId: PropTypes.string,
};
export default Brands;
