import PropTypes from "prop-types";
const Additionalinfo = ({ additionalinfo }) => {
  return (
    <div
      className="bg-white p-5"
      dangerouslySetInnerHTML={{ __html: additionalinfo }}
    ></div>
  );
};
Additionalinfo.propTypes = {
  additionalinfo: PropTypes.string,
};
export default Additionalinfo;
