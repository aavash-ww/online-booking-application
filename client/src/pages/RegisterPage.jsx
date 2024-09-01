import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registered Succesfully");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  }
  return (
    <>
      <div className="mt-6 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="font-bold text-4xl text-center">Register</h1>
          <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Enter your password "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="primary">Register</button>
            <div className="text-sm text-center mt-1 text-gray-500">
              Are you already loggedin?{" "}
              <Link to={"/login"} className="underline text-black">
                Login here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
