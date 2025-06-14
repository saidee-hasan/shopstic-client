import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import ProductViewModal from "../../../Modals/ProductViewModal";
import { PhotoProvider, PhotoView } from "react-photo-view";

const LeftSide = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10 flex flex-col gap-5 items-center justify-center">
      <PhotoProvider
      
      >
        <figure>
          <PhotoView
           src={product?.productImages?.[0]}>
            <img
              className="md:max-w-[380px] md:max-h-[380px]"
              src={product?.productImages?.[0]}
              alt="product_image"
            />
          </PhotoView>
        </figure>
      </PhotoProvider>

      <div className="flex items-center gap-3">
        {product?.videoURL && (
          <FaPlay
            className="border w-14 h-14 rounded p-3 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
        <PhotoProvider>
          {product?.productImages?.map((image) => (
            <figure key={image}>
              <PhotoView key={image} src={image}>
                <img
                  className="border w-14 h-14 rounded p-1 cursor-pointer"
                  src={image}
                  alt="product_gallery_image"
                />
              </PhotoView>
            </figure>
          ))}
        </PhotoProvider>
        <div>
          {isOpen && <ProductViewModal onClose={setIsOpen} isOpen={isOpen} src={product?.videoURL} />}
        </div>
      </div>
    </div>
  );
};

LeftSide.propTypes = {
  product: PropTypes.object,
};

export default LeftSide;
