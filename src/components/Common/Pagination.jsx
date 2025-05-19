import PropTypes from "prop-types";
import cn from "../../utils/cn";

const Pagination = ({ pages, setCurrentPage, currentPage, className }) => {
  return (
    <div
      className={cn(`flex gap-3 my-5 items-center justify-center`, className)}
    >
      {[...Array(pages ? pages : 0).keys()]?.map((page) => (
        <div key={page}>
          <div
            onClick={() => setCurrentPage(page + 1)}
            key={page}
            className={` py-1.5 px-3 cursor-pointer rounded-md text-black ${
              currentPage == page + 1 ? "bg-accent" : "bg-white"
            }`}
          >
            <span className="font-bold">{page + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  className: PropTypes.string,
};
export default Pagination;
