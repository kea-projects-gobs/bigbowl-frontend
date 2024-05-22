import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Logout from "./pages/login/Logout";
import CreateUserPage from "./pages/signup/CreateUserPage";
import BookingPage from "./pages/booking/BookingPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<CreateUserPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
