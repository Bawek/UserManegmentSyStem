import mongoose from "mongoose";

const mongodb = async () => {
    try {
        const url = process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase";
        await mongoose.connect(url);
        console.log(`Successfully connected to the database.${url}` );
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit process on failure
    }
};

export default mongodb;
