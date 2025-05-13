import { FaPlayCircle } from "react-icons/fa";
import banner_1 from "../../../assets/Main/Store/banner_1.jpg";
import banner_2 from "../../../assets/Main/Store/banner_2.jpg";
import { useState } from "react";
import CommonModal from "../../Modals/CommonModal";
import ReactPlayer from "react-player";
const StoreBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="h-[400px] w-full">
        <div className="grid grid-cols-12 gap-3 h-full">
          <div className="col-span-4 bg-slate-600 rounded-xl flex justify-end items-center relative">
            <div className="w-14 h-14 md:w-[70px] md:h-[70px] xl:w-28 xl:h-28 flex items-center justify-center rounded-full bg-[#f3f4f8] -mr-[33px] md:-mr-[44px] xl:-mr-[58px] -mt-[115px] z-40">
              <div>
                <FaPlayCircle
                  className="text-3xl xl:text-5xl text-accent animate-ping cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>
            <img
              className="absolute h-full rounded-xl"
              src={banner_1}
              alt="banner_image"
            />
            <div className="absolute h-full w-full bg-[#081621c0] rounded-xl"></div>
          </div>
          <div className="col-span-8 bg-slate-600 rounded-xl relative flex items-center justify-center">
            <img
              className="absolute h-full w-full rounded-xl"
              src={banner_2}
              alt="banner_image"
            />
            <div className="absolute z-40 text-3xl md:text-4xl xl:text-6xl text-white font-bold p-7 xl:p-20 flex flex-col md:gap-3 xl:gap-5">
              <h1>Active Store Accounts</h1>
              <p className="text-lg xl:text-2xl font-normal">
                An Extensive List of Verified Stores with Accounts Ready for
                Purchases, Ensuring a Seamless Shopping Experience
              </p>
            </div>
            <div className="absolute h-full w-full bg-[#081621c0] rounded-xl"></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <CommonModal
          isOpen={isOpen}
          onClose={setIsOpen}
          title={"Overview"}
          key={"store_overview"}
          
          className="w-[330px] md:w-[700px] md:h-[500px]"
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=9zLN7gSwq_Q"
            controls
            width="100%"
            height="400px"
          />
        </CommonModal>
      )}
    </div>
  );
};

export default StoreBanner;
