import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ThemeContext from "../contexts/ThemeContext";
import useBahasa from "../hooks/useBahasa";
import InputRegister from "../components/InputRegister";

import { register } from "../utils/network-data";
import { swalErorr, swalLoading, swalSuccess, swalClose } from "../utils/swal";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const { isBahasa } = useBahasa();

  const onRegisterHandler = async (user) => {
    swalLoading({ theme });
    const { error, message } = await register(user);

    if (error) {
      swalErorr({ message, theme });
    } else {
      swalSuccess({
        message: isBahasa("Berhasil mendaftar", "Register is success"),
        theme,
      });
      setTimeout(() => {
        swalClose();
        navigate("/");
      }, 1000);
    }
  };

  return (
    <section className="register-page">
      <h2>
        {isBahasa(
          "Buat akun dan mulai gunakan notes online sekarang",
          "Create an account and start your online notes today"
        )}
      </h2>
      <InputRegister onRegister={onRegisterHandler} />
      <p>
        {isBahasa("Sudah punya akun? ", "Already have an account? ")}
        <a href="/login" className="font-bold">
          Log In
        </a>
      </p>
    </section>
  );
};

export default RegisterPage;
