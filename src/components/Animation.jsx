import PropTypes from "prop-types";
import { ThemeContext } from "../ThemeContext";
import { useContext, useState } from "react";
import swlogo from "../assets/images/sw-logo.png";

const Animation = ({ content }) => {
  // Context
  const theme = useContext(ThemeContext);
  //State
  const [animate, setAnimate] = useState("animated");
  const [textVisibility, setTextVisibility] = useState("hidden");

  const { episode_id, title, opening_crawl } = content;

  /**
   * Convert episode_id arabic number into Roman number ideally
   * this should be a function but for a simpler implementation I just used a map
   */

  const roman = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  };

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
    <div className="animation-container">
      <div className="animation-content">
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
            <p>{opening_crawl}</p>
          </div>
        </div>
        <div className="crawl">
          <div className={`crawl-text ${animate}`}>
            <p>{`Episode ${roman[episode_id]}`}</p>
            <p>{title.toUpperCase()}</p>
            <br />
            <p>{opening_crawl}</p>
          </div>
        </div>
      </div>
      <div className="animation-controls">
        <button
          id="skip"
          className={`small-btn ${theme}`}
          onClick={() => skipHandler()}
        >
          Skip
        </button>
        <button
          id="replay"
          className={`small-btn ${theme}`}
          onClick={() => replayHandler()}
        >
          <i className="fas fa-redo 2x"></i>
        </button>
      </div>
    </div>
  );
};

Animation.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Animation;
