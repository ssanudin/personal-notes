import React, { useContext } from "react";
import PropTypes from "prop-types";

import ThemeContext from "../contexts/ThemeContext";
import useBahasa from "../hooks/useBahasa";

import InputLogin from "../components/InputLogin";

import { login } from "../utils/network-data";
import { swalErorr, swalLoading, swalSuccess, swalClose } from "../utils/swal";

const LoginPage = ({ loginSuccess }) => {
  const { theme } = useContext(ThemeContext);
  const { isBahasa } = useBahasa();

  const onLoginHandler = async (user) => {
    swalLoading({ theme });
    const { error, data, message } = await login(user);

    if (error) {
      swalErorr({ message, theme });
    } else {
      swalSuccess({
        message: isBahasa("Berhasil Login", "Login success"),
        theme,
      });
      setTimeout(() => {
        swalClose();
        loginSuccess(data);
      }, 1000);
    }
  };

  return (
    <section className="login-page">
      <h2>
        {isBahasa("Login ke Personal Notes", "Sign In to Personal Notes")}
      </h2>
      <InputLogin onLogin={onLoginHandler} />
      <p>
        {isBahasa("Belum punya akun? ", "Don't have an account? ")}
        <a href="/register" className="font-bold">
          {isBahasa("Daftar di sini", "Sign Up")}
        </a>
      </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
