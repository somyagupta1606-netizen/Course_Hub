import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    role: "student",
    profileImage: "",
    bio: "",
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
      let response = await api.post("/users/signup", user);

      toast.success(response.data.msg);
      setUser({
        name: "",
        email: "",
        contactNo: "",
        password: "",
        role: "",
        profileImage: "",
        bio: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 py-10">
      <form
        className="bg-white w-125 p-8 rounded-lg shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={user.name}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={user.email}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        />
        <input
          type="tel"
          name="contactNo"
          placeholder="Enter Your Contact Number"
          value={user.contactNo}
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

        <input
          type="text"
          name="profileImage"
          placeholder="Enter Profile Image URL"
          value={user.profileImage}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        />

        <textarea
          name="bio"
          placeholder="Enter Bio"
          value={user.bio}
          onChange={changeHandler}
          rows="4"
          className="w-full border p-3 rounded-md mb-4 resize-none"
        ></textarea>

        <select
          name="role"
          value={user.role}
          onChange={changeHandler}
          className="w-full border p-3 rounded-md mb-4"
        >
          <option value="student">Student</option>

          <option value="instructor">Instructor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already Have An Account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;