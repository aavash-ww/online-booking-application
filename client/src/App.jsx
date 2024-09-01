import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
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
          <Route path="/account/:subpages?" element={<AccountPage />} />
          <Route
            path="/account/:subpages/:action"
            element={<AccountPage />}
          ></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
