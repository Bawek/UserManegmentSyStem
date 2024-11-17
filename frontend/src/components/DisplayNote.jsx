import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";

const DisplayNote = () => {
  const {
    token,
    navigate,
    setToken,
    handleEdit,
    fetchNotes,
    filteredNotes,
    searchText,
    deleteNote,
  } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if no token, else fetch notes
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoading(true);
      fetchNotes()
        .then(() => setError(null))
        .catch((err) => setError(err?.message || "Failed to load notes"))
        .finally(() => setLoading(false));
    }
  }, [token]);

  // Sync token with localStorage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token, setToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Notes</h1>

        {/* Notes Display */}
        {loading ? (
          <div className="text-center py-10">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
              ></path>
            </svg>
            <p className="mt-3 text-gray-500">Loading notes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotes.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name || "Untitled Note"}</h2>
                <p className="text-gray-600">{item.note || "No content available."}</p>

                {/* Edit Icon */}
                <button
                  onClick={() => handleEdit(item._id)}
                  className="p-3 hover:bg-blue-100 rounded-full"
                  aria-label="Edit Note"
                >
                  <i className="fas fa-edit text-blue-500 text-2xl"></i>
                </button>

                {/* Delete Icon */}
                <button
                  onClick={() => deleteNote(item._id)}
                  className="p-3 hover:bg-red-100 rounded-full"
                  aria-label="Delete Note"
                >
                  <i className="fas fa-trash-alt text-red-500 text-2xl"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No notes found. Start adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayNote;
