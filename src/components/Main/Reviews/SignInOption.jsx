import { Link } from "react-router-dom";
import Button from "../../Common/Button";

const SignInOption = () => {
  return (
    <div className="mb-10 xl:mb-20 my_container">
      <div className="p-10 bg-widget rounded-xl">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <div className="flex flex-wrap items-center gap-5 text-white">
            <div>
              <h2 className="font-medium text-3xl leading-normal">
                {`Let's part of with captake today`}
              </h2>
              <span className="text-xl">Signing up takes only 2 mins</span>
            </div>
          </div>
          <Link to={'/sign-up'}>
            <Button className="px-10 py-4 text-white animate-bounce">
              Sign up now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInOption;
