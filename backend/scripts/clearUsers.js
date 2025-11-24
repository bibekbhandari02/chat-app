import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

dotenv.config();

const clearAllUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");

		// Delete all messages
		await Message.deleteMany({});
		console.log("All messages deleted");

		// Delete all conversations
		await Conversation.deleteMany({});
		console.log("All conversations deleted");

		// Delete all users
		await User.deleteMany({});
		console.log("All users deleted");

		console.log("\n✅ Database cleared successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error clearing database:", error.message);
		process.exit(1);
	}
};

clearAllUsers();
