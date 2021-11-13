import PropTypes from "prop-types";
import { useState } from "react";
import swlogo from "../assets/images/sw-logo.png";

const Opening = ({ modalContent, modalHandler }) => {
  const [animate, setAnimate] = useState("animated");
  const [textVisibility, setTextVisibility] = useState("hidden");
  const { episode, intro, title } = modalContent;

  const skipHandler = () => {
    setAnimate("");
    setTextVisibility("visible");
  };

  const replayHandler = () => {
    setTextVisibility("hidden");
    setAnimate("");
    setTimeout(setAnimate, 0, "animated");
  };

  return (
    <div className="modal-container">
      <div className="modal-top">
        <button id="skip" className="small-btn" onClick={() => skipHandler()}>
          Skip
        </button>
        <button
          id="replay"
          className="small-btn"
          onClick={() => replayHandler()}
        >
          <i className="fas fa-redo 2x"></i>
        </button>
        <button
          id="close"
          className="small-btn"
          onClick={() => modalHandler(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-main">
        <div className="modal-content">
          <div className="front">
            <h1 className={`intro ${animate}`}>
              A long time ago, in a galaxy far, far away...
            </h1>
            <img
              className={`swlogo ${animate}`}
              src={swlogo}
              alt="star wars logo"
            />
            <div className={`op-text ${textVisibility} ${animate} `}>
              <p>{intro}</p>
            </div>
          </div>
          <div className="crawl">
            <div className={`crawl-text ${animate}`}>
              <p>{episode}</p>
              <p>{title.toUpperCase()}</p>
              <br />
              <p>{intro}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Opening.propTypes = {
  modalContent: PropTypes.object.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default Opening;
