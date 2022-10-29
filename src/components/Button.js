import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, title, onClick, disabled = false }) => {
  return (
    <button
      className="action"
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
