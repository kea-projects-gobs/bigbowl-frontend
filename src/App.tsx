import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Logout from "./pages/login/Logout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
