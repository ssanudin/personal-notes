import React, { useContext } from "react";
import PropTypes from "prop-types";

import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import useInputError from "../hooks/useInputError";
import useBahasa from "../hooks/useBahasa";

import InputForm from "./InputForm";

import { isEmail, errorMessages } from "../utils/index";

const InputRegister = ({ onRegister }) => {
  const { locale } = useContext(LocaleContext);
  const { isBahasa } = useBahasa();

  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");
  const [errors, setErrors, errorState] = useInputError({
    name,
    email,
    password,
    confirmPassword,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const _error = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      _error.name = "required";
    }
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
    if (!confirmPassword) {
      _error.confirmPassword = "required";
    } else if (password !== confirmPassword) {
      _error.confirmPassword = "notmatch";
    }

    if (Object.values(_error).join("")) {
      setErrors(_error);
    } else {
      errorState.reset();
      onRegister({ name, email, password, confirmPassword });
    }
  };

  return (
    <form className="input-register" onSubmit={onSubmitHandler}>
      <InputForm
        type="text"
        id="name"
        value={name}
        label={isBahasa("Nama", "Name")}
        onChange={setName}
      />
      {errors.name && (
        <p className="input-alert danger">
          {errorMessages[locale].name[errors.name]}
        </p>
      )}
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
      <InputForm
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        label={isBahasa("Konfirmasi Password", "Confirm Password")}
        onChange={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <p className="input-alert danger">
          {errorMessages[locale].confirmPassword[errors.confirmPassword]}
        </p>
      )}
      <button className="input-btn-submit" type="submit">
        Register
      </button>
    </form>
  );
};

InputRegister.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default InputRegister;
