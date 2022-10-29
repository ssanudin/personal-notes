import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { FiSun, FiMoon, FiLogOut, FiArchive } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import { IoPersonCircle } from "react-icons/io5";

import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";

import useBahasa from "../hooks/useBahasa";

import { swalConfirm, swalLoading } from "../utils/swal";

const Navigation = ({ name, onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  const { isBahasa } = useBahasa();

  const onLogoutHandler = async () => {
    const confirmResult = await swalConfirm({
      title: isBahasa("Anda yakin untuk Keluar?", "Are you sure to logout?"),
      confirmText: isBahasa("Keluar", "Logout"),
      cancelText: isBahasa("Batal", "Cancel"),
      theme,
      color: "danger",
    });

    if (confirmResult.isConfirmed) {
      swalLoading();
      onLogout();
    }
  };

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="archives">
              <FiArchive /> <span>{isBahasa("Terarsip", "Archived")}</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="dropdown-menu">
        <div className="dropdown-btn-wrapper">
          <button className="dropdown-btn action">
            <IoPersonCircle />
          </button>
          <span>{name}</span>
        </div>
        <div className="dropdown-content">
          <button
            type="button"
            className="button-logout"
            onClick={onLogoutHandler}
            title="Logout"
          >
            <FiLogOut /> Logout
          </button>
          <hr />
          <button
            type="button"
            className="toggle-locale"
            onClick={toggleLocale}
            title={isBahasa("Change Language EN", "Ubah Bahasa ID")}
          >
            <SiGoogletranslate />{" "}
            <span className="locale">{locale.toUpperCase()}</span>
          </button>
          <button
            type="button"
            className="toggle-theme"
            onClick={toggleTheme}
            title={isBahasa(
              `Ubah Tema ${theme === "dark" ? "Terang" : "Gelap"}`,
              `Change Theme ${theme === "dark" ? "Light" : "Dark"}`
            )}
          >
            <FiSun />
            <div className={`switch ${theme}`}>
              <span className="slider"></span>
            </div>
            <FiMoon />
          </button>
        </div>
      </div>
    </>
  );
};

Navigation.propTypes = {
  name: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
