import PropTypes from "prop-types";
function MessageBox({ type, message }) {
  return <div className={`alert alert-${type || "info"}`}>{message}</div>;
}

MessageBox.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default MessageBox;
