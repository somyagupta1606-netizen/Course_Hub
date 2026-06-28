import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      let response = await api.get("/cart/get");
      setCart(response.data.cart);
    } catch (error) {
      console.log(error);

      if (error.response.status === 404) {
        setCart(null);
      } else {
        toast.error(error.response.data.msg || "Failed To Fetch Cart");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (courseId) => {
    try {
      let response = await api.delete(`/cart/remove/${courseId}`);
      toast.success(response.data.msg);
      getCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Failed To Remove Course");
    }
  };

  const enrollCourses = async () => {
    try {
      let response = await api.post("/enrollments/create");
      toast.success(response.data.msg);
      getCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Enrollment Failed");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {!cart || cart.courses.length === 0 ? (
        <h2 className="text-xl">Cart Is Empty</h2>
      ) : (
        <>
          <div className="space-y-5">
            {cart.courses.map((item) => (
              <div
                key={item.courseId._id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.courseId.title}
                  </h2>

                  <p>₹{item.courseId.price}</p>

                  <p>{item.courseId.duration}</p>
                </div>

                <button
                  onClick={() => removeCourse(item.courseId._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white shadow-md p-5 rounded-lg">
            <h2 className="text-2xl font-bold">
              Total Price : ₹{cart.totalPrice}
            </h2>

            <button
              onClick={enrollCourses}
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Proceed To Enroll
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;