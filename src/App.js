import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/admin" exact element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
