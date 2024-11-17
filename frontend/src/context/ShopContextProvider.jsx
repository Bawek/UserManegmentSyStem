import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [textarea, setTextarea] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [searchText, setSearchText] = useState(""); // For search queries
  const [allNotes, setAllNotes] = useState([]); // Stores all notes
  const [filteredNotes, setFilteredNotes] = useState([]); // Stores filtered notes
  const navigate = useNavigate();

  // Sync token with localStorage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  // Handle search functionality
  const handleSearchChange = (query) => {
    setSearchText(query);
    const lowerQuery = query.toLowerCase();

    // Filter `allNotes` based on search query
    const filtered = allNotes.filter(
      (note) =>
        note.name.toLowerCase().includes(lowerQuery) ||
        note.note.toLowerCase().includes(lowerQuery)
    );

    setFilteredNotes(filtered); // Update filtered notes
  };

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/note/view`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setAllNotes(response.data.notes); // Store all notes
        setFilteredNotes(response.data.notes); // Initialize filtered notes with all notes
      } else {
        toast.error(response.data.message || "Failed to load notes");
      }
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
    }
  };

  // Handle note editing
  const handleEdit = async (id) => {
    try {
      navigate("/update"); // Navigate to update page

      const response = await axios.post(
        `${backendUrl}/api/note/update`,
        { name, note: textarea, itemId: id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Note updated successfully!");
        fetchNotes(); // Refresh notes after updating
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault(); // Corrected placement
    try {
      const response = await axios.post(
        `${backendUrl}/api/note/add`,
        { name, note: textarea },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Note added successfully!");
        fetchNotes(); // Refresh notes after adding
      }
      navigate("/");
    } catch (error) {
      toast.error("Error adding note");
      console.error(error.message);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/note/remove`,
        { noteId: id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Note deleted successfully!");
        fetchNotes(); // Refresh notes after deleting
      } else {
        toast.error(response.data.message || "Failed to delete note");
      }
    } catch (error) {
      toast.error("Error deleting note");
      console.error(error.message);
    }
  };

  // Logout functionality
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  // Update filtered notes based on search query
  useEffect(() => {
    if (searchText.trim()) {
      const lowerQuery = searchText.toLowerCase();
      const filtered = allNotes.filter(
        (note) =>
          note.name.toLowerCase().includes(lowerQuery) ||
          note.note.toLowerCase().includes(lowerQuery)
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(allNotes);
    }
  }, [searchText, allNotes]);

  const value = {
    backendUrl,
    token,
    setToken,
    navigate,
    name,
    setName,
    textarea,
    setTextarea,
    searchText,
    setSearchText,
    filteredNotes,
    fetchNotes,
    handleSearchChange,
    handleEdit,
    addNote,
    deleteNote,
    handleLogout,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
