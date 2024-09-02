import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavPage from "../AccountNavPage";

export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  let { subpages } = useParams;
  const navigate = useNavigate();

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }
  if (subpages === undefined) {
    subpages = "profile";
  }

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <AccountNavPage />
      {subpages === "profile" && (
        <div className=" mx-auto max-w-sm">
          logged in as {user.name} ({user.email})
          <button className="primary mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpages === "accommodations" && <PlacesPage />}
    </div>
  );
}
