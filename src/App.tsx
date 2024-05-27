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
import BookingDetails from "./pages/booking/BookingDetails";
import BookingConfirmation from "./pages/booking/BookingConfirmation";
import UserBookingsPage from "./pages/user/UserBookingsPage";
import ReservationsManagerPage from "./pages/management/ReservationsManagerPage";

function App() {
  return (
    <>
      <BasketProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/booking/confirmation"
              element={
                <RequireAuth roles={["CUSTOMER"]}>
                  <BookingConfirmation />
                </RequireAuth>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <RequireAuth roles={["CUSTOMER"]}>
                  <BookingDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/user"
              element={
                <RequireAuth roles={["CUSTOMER"]}>
                  <UserBookingsPage />
                </RequireAuth>
              }
            />
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

            <Route
              path="/admin"
              element={
                <RequireAuth roles={["EMPLOYEE"]}>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <RequireAuth roles={["EMPLOYEE"]}>
                  <ReservationsManagerPage />
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
