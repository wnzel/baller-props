import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import NBAPage from "./pages/NBA/NBA";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/nba" element={<NBAPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
