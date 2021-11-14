import PropTypes from "prop-types";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

const ToggleSwitch = ({ toggler }) => {
  const theme = useContext(ThemeContext);

  const toggleHandler = (e) => {
    e.target.checked ? toggler("dark") : toggler("light");
  };

  return (
    <div className="switch">
      <input
        type="checkbox"
        id="toggle"
        className={theme}
        onChange={toggleHandler}
      />
      <span></span>
    </div>
  );
};

ToggleSwitch.protpTypes = {
  toggler: PropTypes.func.isRequired,
};

export default ToggleSwitch;
