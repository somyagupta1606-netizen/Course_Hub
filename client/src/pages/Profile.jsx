import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    profileImage: "",
    bio: "",
  });

  const getProfile = async () => {
    try {
      let response = await api.get("/users/profile");

      setUser(response.data.user);

      setFormData({
        name: response.data.user.name || "",
        email: response.data.user.email || "",
        contactNo: response.data.user.contactNo || "",
        profileImage: response.data.user.profileImage || "",
        bio: response.data.user.bio || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      let response = await api.put("/users/update-profile", formData);

      toast.success(response.data.msg);
      setUser(response.data.updatedUser);
      setEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Update Failed");
    }
  };

  const deleteProfile = async () => {
    try {
      let response = await api.delete("/users/delete-profile");

      toast.success(response.data.msg);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.msg || "Delete Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {!editMode ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={user.profileImage || "https://placehold.co/150x150"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border"
              />
            </div>

            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Contact:</strong> {user.contactNo}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <p>
                <strong>Bio:</strong> {user.bio || "No Bio Added"}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-5 py-2 rounded"
              >
                Update Profile
              </button>

              <button
                onClick={deleteProfile}
                className="bg-red-500 text-white px-5 py-2 rounded"
              >
                Delete Profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="Profile Image URL"
              className="w-full border p-3 rounded"
            />

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows="4"
              className="w-full border p-3 rounded"
            ></textarea>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
