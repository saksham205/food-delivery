const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    const user = await User.findOneAndUpdate(
      { email: "saksham@gamil.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found ❌");
    } else {
      console.log("Admin created successfully ✅");
      console.log("Email:", user.email);
      console.log("Role:", user.role);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

makeAdmin();