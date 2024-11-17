import userModel from "../Model/userModel.js";
import noteModel from "../Model/noteModel.js";

// Add a note
const add = async (req, res) => {
  try {
    const { name, note, userId } = req.body;

    // Validate input
    if (!name || !note) {
      console.log("user not found");

      return res.status(400).json({
        success: false,
        message: "All fields are required (name, note, userId).",
      });
    }

    // Check if user exists


    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Create the note
    const userData = await noteModel.create({ name, note });
    res.status(201).json({
      success: true,
      message: " successfully added.",
      userData,
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add note.",
      error: error.message,
    });
  }
};

// View all notes
const view = async (req, res) => {
  try {
    const notes = await noteModel.find({});
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully.",
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes.",
      error: error.message,
    });
  }
};

// Update a note
const update = async (req, res) => {
  try {
    const { name, note, userId, noteId } = req.body;

    // Validate input
    if (!userId || !noteId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Note ID are required.",
      });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Update the note
    const updatedNote = await noteModel.findByIdAndUpdate(
      noteId,
      { name, note },
      { new: true } // Return the updated document
    );

    if (updatedNote) {
      res.status(200).json({
        success: true,
        message: "Note successfully updated.",
        updatedNote,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update note.",
      error: error.message,
    });
  }
};

// Delete a note
const remove = async (req, res) => {
  try {
    const { userId, noteId } = req.body;

    // Validate input
    if (!userId || !noteId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Note ID are required.",
      });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Delete the note
    const deletedNote = await noteModel.findByIdAndDelete(noteId);

    if (deletedNote) {
      res.status(200).json({
        success: true,
        message: "Note successfully deleted.",
        deletedNote,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete note.",
      error: error.message,
    });
  }
};

export { add, view, update, remove };
