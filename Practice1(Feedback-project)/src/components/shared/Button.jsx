import React from "react";
import PropTypes from "prop-types";

function Button({ children, isDisabled, type, version }) {
  return (
    <button type={type} className={`btn btn-${version}`} disabled={isDisabled}>
      Send
    </button>
  );
}

Button.DefaultProps = {
  type: "submit",
  version: "primary",
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  version: PropTypes.string,
};

export default Button;
