import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContextProvider";

const Login = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        currentState === "Sign Up"
          ? "/api/user/register"
          : "/api/user/login";

      const { data } = await axios.post(backendUrl + endpoint, formData);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center justify-center w-full sm:w-[90%] sm:max-w-[30rem] p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        {/* Form Title */}
        <div className="font-semibold text-2xl text-gray-800">{currentState}</div>

        {/* Name Field (Visible Only on Sign Up) */}
        {currentState === "Sign Up" && (
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            className="w-full bg-gray-100 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
          />
        )}

        {/* Email Field */}
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          className="w-full bg-gray-100 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          className="w-full bg-gray-100 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your password"
        />

        {/* Additional Actions */}
        <div className="flex justify-between w-full text-sm text-gray-600">
          <p className="hover:underline cursor-pointer text-gray-500">
            Forgot password?
          </p>
          <div>
            {currentState === "Sign Up" ? (
              <p
                className="hover:underline cursor-pointer text-blue-600"
                onClick={() => setCurrentState("Log In")}
              >
                Log In
              </p>
            ) : (
              <p
                className="hover:underline cursor-pointer text-blue-600"
                onClick={() => setCurrentState("Sign Up")}
              >
                Create Account
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-6 w-full sm:w-auto rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-medium shadow-md hover:shadow-lg transition duration-200`}
        >
          {isSubmitting ? "Processing..." : currentState === "Sign Up" ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
