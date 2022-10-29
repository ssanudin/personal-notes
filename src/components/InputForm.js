import React from "react";
import PropTypes from "prop-types";

const InputForm = ({ type, id, value, label, onChange }) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-control"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputForm.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputForm;
