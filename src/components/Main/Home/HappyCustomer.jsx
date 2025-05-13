import { FaGrinHearts } from "react-icons/fa";
import Button from "../../Common/Button";
import { Link } from "react-router-dom";
const HappyCustomer = () => {
  return (
    <div className="p-10 bg-widget rounded-sm mt-10 xl:mt-20">
      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex flex-wrap items-center gap-5 text-white">
          <div>
            <FaGrinHearts className="text-6xl up-and-down" />
          </div>
          <div>
            <h2 className="font-medium text-3xl leading-normal capitalize">
              happy customers
            </h2>
            <span className="text-xl">
              Over 25 Satisfied Customers and Counting!
            </span>
          </div>
        </div>
        <Link to={'/reviews'}>
          <Button className="px-10 py-4 rounded-sm text-white animate-bounce">
            See Reviews
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HappyCustomer;
