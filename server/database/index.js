import mongoose, { mongo } from "mongoose";

const videoSchema = new mongoose.Schema({
  CustomerId: Number,
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  CustomerId: Number,
  Cart: [videoSchema],
});

const User = mongoose.model("User", userSchema);
const Videos = mongoose.model("Videos", videoSchema);

export { User, Videos };
