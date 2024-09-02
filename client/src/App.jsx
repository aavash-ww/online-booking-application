import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFromPage from "./pages/PlacesFromPage";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/accommodations" element={<PlacesPage />} />
          <Route
            path="/account/accommodations/new"
            element={<PlacesFromPage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
