import PropTypes from "prop-types";
const StoreFilterTop = ({ total, setLimit, setSortedValue, sortedValue }) => {
  return (
    <div className="my-14">
      <div className="border-b-2 p-5 bg-white rounded-xl">
        <div className="flex items-center justify-between gap-5">
          <span className="font-semibold">
            Total store : {total ? total : 0}
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <div className="items-center gap-2 hidden md:flex">
              <span className="font-semibold">Store Limit:</span>
              <select
                onChange={(e) => setLimit(e.target.value)}
                className="focus:outline-none border p-1 rounded-md text-base"
              >
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="items-center gap-2 hidden md:flex">
              <span className="font-semibold">Sort by:</span>
              <select
                onChange={(e) => setSortedValue(e.target.value)}
                defaultValue={sortedValue}
                className="focus:outline-none border p-1 rounded-md text-base"
              >
                <option value="1">Old seller</option>
                <option value="-1">New seller</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StoreFilterTop.propTypes = {
  total: PropTypes.number,
  setLimit: PropTypes.func,
  setSortedValue: PropTypes.func,
  sortedValue: PropTypes.string,
};
export default StoreFilterTop;
