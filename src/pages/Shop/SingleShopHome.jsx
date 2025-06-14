import { useLocation } from "react-router-dom";
import Brands from "../../components/Shop/SingleShopHome/Brands";
import Notice from "../../components/Shop/SingleShopHome/Notice";
import SingleShopBanner from "../../components/Shop/SingleShopHome/SingleShopBanner";
import SingleShopReviews from "../../components/Shop/SingleShopHome/SingleShopReviews";
import { smoothScroll } from "../../utils/scrollToTop";
import MostViewProduct from "../../components/Shop/SingleShopHome/MostViewProduct";
import LatestProduct from "../../components/Shop/SingleShopHome/LatestProduct";
import MostReviewProducts from "../../components/Shop/SingleShopHome/MostReviewProducts";

const SingleShopHome = () => {
  smoothScroll();
  const { pathname } = useLocation();
  const sellerId = pathname?.split("/")?.[2];
  return (
    <section>
      <div className="my_container">
        <SingleShopBanner sellerId={sellerId} />
        <Notice sellerId={sellerId} />
        <div className="flex flex-col gap-y-10 xl:gap-y-20">
          <div>
            <MostReviewProducts sellerId={sellerId} />
          </div>
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-bold text-lg">Latest products</h2>
              <span>Discover the Newest Arrivals for You!</span>
            </div>
            <LatestProduct sellerId={sellerId} />
          </div>
        </div>
        <MostViewProduct sellerId={sellerId} />
      </div>
      <Brands sellerId={sellerId} />
      <div className="my_container">
        <SingleShopReviews sellerId={sellerId} />
      </div>
    </section>
  );
};

export default SingleShopHome;
