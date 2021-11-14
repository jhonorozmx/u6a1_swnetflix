import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
//

const Modal = ({ modalHandler, children }) => {
  // Context
  const theme = useContext(ThemeContext);

  return (
    <div className="modal-container">
      <div className="modal-top">
        <button
          id="close"
          className={`small-btn ${theme}`}
          onClick={() => modalHandler({ show: false })}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-main">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  modalHandler: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
