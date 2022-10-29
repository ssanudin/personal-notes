import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ArchivesPage from "./pages/ArchivesPage";
import NotePage from "./pages/NotePage";
import NewNotePage from "./pages/NewNotePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Error404 from "./pages/404";

import Navigation from "./components/Navigation";

import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";

import { getUserLogged, putAccessToken } from "./utils/network-data";
import { setLocal, getLocal } from "./utils/index";
import { swalLoading, swalClose } from "./utils/swal";

import { FiSun, FiMoon } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";

import bannerImg from "./assets/daria-nepriakhina-unsplash.jpg";

const App = () => {
  //STATE
  const [init, setInit] = useState(true);
  const [authedUser, setAuthedUser] = useState(null);
  const [theme, setTheme] = useState(() => getLocal("theme") || "dark");
  const [locale, setLocale] = useState(() => getLocal("locale") || "id");

  //SET STATE
  const toggleTheme = () => {
    setTheme((prevValue) => {
      const currValue = prevValue === "dark" ? "light" : "dark";
      setLocal("theme", currValue);
      return currValue;
    });
  };
  const toggleLocale = () => {
    setLocale((prevValue) => {
      const currValue = prevValue === "id" ? "en" : "id";
      setLocal("locale", currValue);
      return currValue;
    });
  };

  //EFFECT
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserLogged();

      if (!userData.error) {
        setAuthedUser(userData.data);
      }

      setInit(false);
    };

    fetchUserData();
  }, []);

  //FUNCTIONS / HANDLER
  const onLoginSuccess = async (data) => {
    putAccessToken(data.accessToken);

    const userData = await getUserLogged();
    if (!userData.error) {
      setAuthedUser(userData.data);
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  //CONTEXT VARIABLES
  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);
  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  //ROUTES CONSTANT
  const home = "/",
    login = "/login",
    register = "/register",
    notes = "/notes",
    archives = "/archives";

  if (init) {
    swalLoading();

    return null;
  }

  // UNAUTHED USER
  if (authedUser === null) {
    swalClose();

    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container" data-theme={theme}>
            <div className="sign-container">
              <div className="main-container">
                <main>
                  <Routes>
                    <Route
                      path={"/*"}
                      element={<LoginPage loginSuccess={onLoginSuccess} />}
                    />
                    <Route path={register} element={<RegisterPage />} />
                  </Routes>
                  <div className="sign-btn-action">
                    <button
                      type="button"
                      className="toggle-locale"
                      onClick={toggleLocale}
                    >
                      <SiGoogletranslate />{" "}
                      <span className="locale">{locale.toUpperCase()}</span>
                    </button>
                    <button
                      type="button"
                      className="toggle-theme"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>
                  </div>
                </main>
              </div>
              <div className="banner-container">
                <div
                  className="banner-img"
                  style={{ backgroundImage: `url(${bannerImg})` }}
                ></div>
                <div className="banner-content">
                  <div className="banner-title">
                    <h1>Personal Notes</h1>
                  </div>
                  <span className="banner-photo-credit">
                    Photo by{" "}
                    <a href="https://unsplash.com/@epicantus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                      Daria Nepriakhina 🇺🇦
                    </a>{" "}
                    on{" "}
                    <a href="https://unsplash.com/s/photos/notes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                      Unsplash
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  // AUTHED USER
  swalClose();

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container" data-theme={theme}>
          <header>
            <h1>
              <Link to={home}>PN</Link>
            </h1>
            <Navigation onLogout={onLogout} name={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path={home} element={<HomePage />} />
              {[login, register].map((_path, i) => (
                <Route
                  key={i}
                  path={_path}
                  element={<Navigate to={home} replace={true} />}
                />
              ))}
              <Route path={archives} element={<ArchivesPage />} />
              <Route path={notes}>
                <Route index element={<Navigate to={home} replace={true} />} />
                <Route path="new" element={<NewNotePage />} />
                <Route path=":id" element={<NotePage />} />
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
