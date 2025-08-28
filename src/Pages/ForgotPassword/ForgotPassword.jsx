import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "Password reset link sent!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="p-4 my-10">
      <div className="w-full p-6 m-auto bg-white rounded-2xl border border-gray-300 lg:max-w-md">
        <h1 className="text-2xl font-semibold text-center text-indigo-600">
          Reset Password
        </h1>
        <form onSubmit={handleReset} className="mt-6">
          <label className="block text-sm font-semibold text-gray-800">
            Enter your email
          </label>
          <input
            type="email"
            required
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-indigo-600">
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
