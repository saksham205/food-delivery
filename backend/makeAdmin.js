const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    const email = process.argv[2];
    const newPassword = process.argv[3];

    if (!email || !newPassword) {
      console.log(
        "Usage: node resetPassword.js <saksham@gmail.com> <123456>"
      );
      return;
    }

    if (newPassword.length < 6) {
      console.log(
        "Password must be at least 6 characters."
      );
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found ❌");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    console.log("Password reset successfully ✅");
    console.log("Email:", user.email);
    console.log("Role:", user.role);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword();