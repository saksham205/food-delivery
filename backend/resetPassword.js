const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.findOneAndUpdate(
      { email: "saksham@gamil.com" },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      console.log("User not found ❌");
    } else {
      console.log("Password reset successfully ✅");
      console.log("Email:", user.email);
      console.log("Role:", user.role);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

resetPassword();