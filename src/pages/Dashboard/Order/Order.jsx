import Button from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import OrderTable from "../../../components/Dashboard/Pages/Order/OrderTable";
import { useSearchDelay } from "../../../hooks/useSearchDelay";

const Order = () => {
  const { handleChange, searchValue } = useSearchDelay();

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <div className="p-6 mx-auto space-y-6 max-w-7xl bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <span className="text-2xl font-extrabold text-gray-800">Order</span>
          <div className="flex flex-wrap gap-3 justify-end items-center">
            <Input
              onChange={handleChange}
              placeholder="Search..."
              className="w-64 bg-white rounded-lg border border-gray-300 shadow-sm transition focus:ring-2 focus:ring-green-400 focus:border-green-600"
            />
            <Button className="w-36 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition">
              Find Order
            </Button>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-md shadow-md">
          <OrderTable search={searchValue} />
        </div>
      </div>
    </div>
  );
};

export default Order;
