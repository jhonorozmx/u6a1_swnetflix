import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import HomeScreen from "./screens/HomeScreen";
import Toggle from "./components/Toggle";
import sithLogo from "./assets/images/logo-dark-theme.png";
import jediLogo from "./assets/images/logo-light-theme.png";

function App() {
  const [theme, setTheme] = useState("dark");

  const themeSetter = (event) => {
    event.target.checked ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider value={theme}>
      <div className="app">
        <div className="grid-container">
          <div className="theme-toggle">
            <label htmlFor="theme-select">Theme</label>
            <Toggle onChange={themeSetter} />
          </div>
          <header className={`top-row ${theme}`}>
            {theme === "dark" && (
              <img className="logo" src={sithLogo} alt="sith logo" />
            )}
            {theme === "light" && (
              <img className="logo" src={jediLogo} alt="jedi logo" />
            )}
            <h2>The</h2>
            <h1>star wars</h1>
            <h2>Movie Reference</h2>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
            </Routes>
          </main>
          <footer className="bottom-row">ITK 2021 All Rights Reserved</footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
