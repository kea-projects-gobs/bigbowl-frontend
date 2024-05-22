import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Logout from "./pages/login/Logout";
import CreateUserPage from "./pages/signup/CreateUserPage";
import BookingPage from "./pages/booking/BookingPage";
import AdminPage from "./pages/management/AdminPage";
import RequireAuth from "./security/RequireAuth";

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

          <Route
            path="/admin"
            element={
              <RequireAuth roles={["EMPLOYEE"]}>
                <AdminPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
