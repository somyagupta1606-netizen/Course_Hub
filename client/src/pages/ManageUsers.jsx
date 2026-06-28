import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await api.get("/users/all-users");
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      let confirmDelete = window.confirm(
        "Are you sure you want to delete this user?",
      );

      if (!confirmDelete) return;

      await api.delete(`/users/delete-user/${id}`);

      toast.success("User Deleted Successfully");

      getUsers();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="border p-3">S.No</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Contact</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border p-3 text-center">{index + 1}</td>

                  <td className="border p-3">{user.name}</td>

                  <td className="border p-3">{user.email}</td>

                  <td className="border p-3 text-center">{user.contactNo}</td>

                  <td className="border p-3 text-center capitalize">
                    {user.role}
                  </td>

                  <td className="border p-3 text-center">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-gray-500">Protected</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
