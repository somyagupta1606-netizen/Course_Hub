import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import MyCourses from "../pages/MyCourses";
import Profile from "../pages/Profile";
import CourseDetails from "../pages/CourseDetails";

import InstructorDashboard from "../pages/InstructorDashboard";
import AddCourse from "../pages/AddCourse";
import InstructorCourses from "../pages/InstructorCourses";
import UpdateCourse from "../pages/UpdateCourse";

import AdminDashboard from "../pages/AdminDashboard";
import AdminHome from "../pages/AdminHome";
import ManageCategories from "../pages/ManageCategories";
import ManageCourses from "../pages/ManageCourses";
import ManageUsers from "../pages/ManageUsers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course/:id" element={<CourseDetails />} />

      {/* Student Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Instructor Protected Routes */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="add-course" element={<AddCourse />} />
        <Route path="my-courses" element={<InstructorCourses />} />
      </Route>

      <Route
        path="/edit-course/:id"
        element={
          <ProtectedRoute role="instructor">
            <UpdateCourse />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />

        <Route path="categories" element={<ManageCategories />} />

        <Route path="courses" element={<ManageCourses />} />

        <Route path="users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;