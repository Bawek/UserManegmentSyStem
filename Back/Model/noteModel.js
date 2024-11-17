import mongoose from "mongoose";

// Define the schema
const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

// Create the model or use an existing one
const noteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default noteModel;
