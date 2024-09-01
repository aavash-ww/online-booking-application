import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  }
  return (
    <>
      <div className="mt-6 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="font-bold text-4xl text-center">Login</h1>
          <form className="max-w-md mx-auto mt-4" onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-sm text-center mt-1 text-gray-500">
              Are you not registered yet?{" "}
              <Link to={"/register"} className="underline text-black">
                Register here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
