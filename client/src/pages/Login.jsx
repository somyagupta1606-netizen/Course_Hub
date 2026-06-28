import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      let response = await api.post("/users/login", user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user._id);

      toast.success(response.data.msg);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={submitHandler}
        className="bg-white w-112.5 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't Have An Account ?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;