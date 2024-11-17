import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const {
    name,
    setName,
    textarea,
    setTextarea,
    handleEdit, // Function to handle note editing/updating
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Track submission state
  const [error, setError] = useState(null); // Track any errors

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await handleEdit(); // Execute the edit handler
      navigate("/"); // Navigate back to home after success
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "An error occurred while updating the note.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <form
          className="flex flex-col items-center gap-5 justify-center p-10 rounded w-[40vw] max-w-[30rem] bg-slate-400"
          onSubmit={onSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Update Note
          </h1>

          {/* Note Name Field */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mb-4 border-gray-950 rounded w-full"
            placeholder="Note Name ..."
            required
          />

          {/* Note Content Field */}
          <textarea
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            className="p-2 mb-4 border-gray-950 rounded w-full"
            placeholder="Add Note ..."
            rows="5"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit and Cancel Buttons */}
          <div className="w-full">
            <button
              type="submit"
              className={`p-2 w-full rounded ${
                loading ? "bg-blue-700" : "bg-blue-900"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <p
              onClick={() => navigate("/")}
              className="mt-4 cursor-pointer text-white hover:bg-black p-2 max-w-[4rem] rounded text-center"
              aria-label="Cancel update and return to home"
            >
              Cancel
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
