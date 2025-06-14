import FeatureProducts from "../../../components/Main/Home/FeatureProducts";
import HappyCustomer from "../../../components/Main/Home/HappyCustomer";
import SliderBanner from "../../../components/Main/Home/SliderBanner";

const Home = () => {
  return (
    <section>
      <div className="my_container">
        <SliderBanner />
        <HappyCustomer />
        <FeatureProducts />
      </div>
    </section>
  );
};

export default Home;
