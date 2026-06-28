import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function ManageCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const getCategories = async () => {
    try {
      const response = await api.get("/categories/get-all");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async (e) => {
    try {
      e.preventDefault();

      if (!categoryName.trim()) {
        return toast.error("Category Name is Required");
      }

      await api.post("/categories/create", {
        categoryName,
      });

      toast.success("Category Added Successfully");

      setCategoryName("");

      getCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  const deleteCategory = async (id) => {
    try {
      let confirmDelete = window.confirm(
        "Are you sure you want to delete this category?",
      );

      if (!confirmDelete) return;

      await api.delete(`/categories/delete/${id}`);

      toast.success("Category Deleted Successfully");
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  const editCategory = (category) => {
    setCategoryName(category.categoryName);
    setEditId(category._id);
    setIsEdit(true);
  };

  const updateCategory = async (e) => {
    try {
      e.preventDefault();

      if (!categoryName.trim()) {
        return toast.error("Category Name is Required");
      }

      await api.put(`/categories/update/${editId}`, {
        categoryName,
      });

      toast.success("Category Updated Successfully");

      setCategoryName("");
      setEditId(null);
      setIsEdit(false);

      getCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      {/* Add Category */}

      <form
        onSubmit={isEdit ? updateCategory : addCategory}
        className="flex gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-3 rounded w-full"
        />

        <button
          className={`text-white px-6 rounded cursor-pointer ${
            isEdit ? "bg-yellow-500" : "bg-blue-600"
          }`}
        >
          {isEdit ? "Update" : "Add"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={() => {
              setCategoryName("");
              setEditId(null);
              setIsEdit(false);
            }}
            className="bg-gray-500 text-white px-6 rounded cursor-pointer"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Category Table */}

      <table className="w-full border">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-3 border">S.No</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item, index) => (
            <tr key={item._id}>
              <td className="border p-3 text-center">{index + 1}</td>

              <td className="border p-3">{item.categoryName}</td>

              <td className="border p-3 text-center">
                <button
                  onClick={() => editCategory(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCategories;