import Button from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import OrderTable from "../../../components/Dashboard/Pages/Order/OrderTable";
import { useSearchDelay } from "../../../hooks/useSearchDelay";

const Order = () => {
  const { handleChange, searchValue } = useSearchDelay();

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="font-bold text-xl text-white">Order</span>
          <div className="flex items-center gap-3 justify-end">
            <Input
              onChange={handleChange}
              placeholder="Search..."
              className="bg-white w-full rounded-sm"
            />
            <Button className="w-36 py-2.5">Find Order</Button>
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden bg-widget">
          <OrderTable search={searchValue} />
        </div>
      </div>
    </div>
  );
};

export default Order;
