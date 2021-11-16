import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)`
  & .MuiSwitch-track {
    background-color: #8f1d00;
    opacity: 0.6;
  }

  & .Mui-checked {
    color: #ffffff;
  }
`;
const Toggle = ({ onChange }) => {
  return <CustomSwitch onChange={onChange} />;
};

Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Toggle;
