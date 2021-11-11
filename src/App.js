import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="grid-container">
      <header className="top-row">
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
  );
}

export default App;
