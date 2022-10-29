import React, { useContext } from "react";
import PropTypes from "prop-types";

import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import useInputError from "../hooks/useInputError";

import InputForm from "./InputForm";

import { isEmail, errorMessages } from "../utils/index";

const InputLogin = ({ onLogin }) => {
  const { locale } = useContext(LocaleContext);

  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [errors, setErrors, errorState] = useInputError({ email, password });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const _error = { email: "", password: "" };

    if (!email) {
      _error.email = "required";
    } else if (!isEmail(email)) {
      _error.email = "notvalid";
    }
    if (!password) {
      _error.password = "required";
    } else if (String(password).length < 8) {
      _error.password = "length";
    }

    if (Object.values(_error).join("")) {
      setErrors(_error);
    } else {
      errorState.reset();
      onLogin({ email, password });
    }
  };

  return (
    <form className="input-login" onSubmit={onSubmitHandler}>
      <InputForm
        type="email"
        id="email"
        value={email}
        label="Email"
        onChange={setEmail}
      />
      {errors.email && (
        <p className="input-alert danger">
          {errorMessages[locale].email[errors.email]}
        </p>
      )}
      <InputForm
        type="password"
        id="password"
        value={password}
        label="Password"
        onChange={setPassword}
      />
      {errors.password && (
        <p className="input-alert danger">
          {errorMessages[locale].password[errors.password]}
        </p>
      )}
      <button className="input-btn-submit" type="submit">
        Login
      </button>
    </form>
  );
};

InputLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default InputLogin;
