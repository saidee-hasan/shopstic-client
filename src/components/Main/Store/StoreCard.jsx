import PropTypes from "prop-types";
import LeftBannerPart from "./LeftBannerPart";
import SellerProductPart from "./SellerProductPart";
import SellerRatingPart from "./SellerRatingPart";

const StoreCard = ({ seller }) => {
  return (
    <div>
      <div className="p-5 bg-white rounded-md border shadow-md">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12 gap-5">
          <LeftBannerPart seller={seller} />
          <div className="xl:col-span-8 flex flex-col gap-5">
            <div className="flex items-center flex-wrap justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 border rounded-md p-1"
                  src={seller?.logo}
                  alt="store_logo"
                />
                <h2 className="font-bold underline text-xl uppercase">
                  {seller?.businessName}
                </h2>
              </div>
              <SellerRatingPart seller={seller} />
            </div>
            <SellerProductPart seller={seller} />
          </div>
        </div>
      </div>
    </div>
  );
};

StoreCard.propTypes = {
  seller: PropTypes.object,
};
export default StoreCard;
