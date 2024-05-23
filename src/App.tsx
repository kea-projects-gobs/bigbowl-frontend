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
import SalesPage from "./pages/sales/SalesPage";
import BasketPage from "./pages/sales/BasketPage";
import { BasketProvider } from "./context/BasketProvider";
import { Toaster } from "./components/ui/toaster";
import ConfirmComponent from "./pages/sales/ConfirmComponent";

function App() {
  return (
    <>
      <BasketProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<CreateUserPage />} />
            <Route
              path="/sales"
              element={
                <RequireAuth roles={["EMPLOYEE"]}>
                  <SalesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/sales/basket"
              element={
                <RequireAuth roles={["EMPLOYEE"]}>
                  <BasketPage />
                </RequireAuth>
              }
            />
            <Route path="/sales/confirm" element={<ConfirmComponent/>}/>

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
        <Toaster />
      </BasketProvider>
    </>
  );
}

export default App;
