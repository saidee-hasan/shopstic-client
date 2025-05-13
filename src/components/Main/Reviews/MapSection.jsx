import bang from "../../../assets/Main/Review/bangladash-map-b2140c86.svg";
import Button from "../../Common/Button";
const MapSection = () => {
  return (
    <div className="bg-widget mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-10 xl:mb-20 p-5 lg:p-10 my_container gap-10">
        <div>
          <img src={bang} alt="bangladesh_land_photo" />
        </div>
        <div className="flex flex-col gap-4 xl:gap-7">
          <h2 className="xl:font-bold md:text-2xl xl:text-3xl leading-relaxed xl:leading-normal text-white">
            Captake provides comprehensive on-demand support for vendors across
            all of Bangladesh, streamlining e-commerce operations with ease.
          </h2>
          <span className="text-white">
            Empowering Vendors with Seamless On-Demand Solutions Across
            Bangladesh
          </span>
          <Button className={"w-44 py-4"}>See more details</Button>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
