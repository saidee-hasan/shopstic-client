import ReviewTable from "../../../components/Dashboard/Pages/Review/ReviewTable";
import Button from "../../../components/Common/Button";
import { useSearchDelay } from "../../../hooks/useSearchDelay";
import Input from "../../../components/Common/Input";

const Review = () => {
  const { handleChange, searchValue } = useSearchDelay();
  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="font-bold text-xl text-white">Review</span>
          <div className="flex items-center gap-3 justify-end">
            <Input
              onChange={handleChange}
              placeholder="Search..."
              className="bg-white w-full rounded-sm"
            />
            <Button className="w-36 py-2.5">Find Review</Button>
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden bg-widget">
          <ReviewTable search={searchValue} />
        </div>
      </div>
    </div>
  );
};

export default Review;
