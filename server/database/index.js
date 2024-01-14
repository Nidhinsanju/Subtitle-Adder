import mongoose from "mongoose";

const SubSchema = new mongoose.Schema({
  SubID: Number,
  name: String,
  url: String, // Assuming this is a URL
  contentType: String,
});

const VideoSchema = new mongoose.Schema({
  videoID: Number,
  name: String,
  url: String, // Assuming this is a URL
  contentType: String,
});

const cartSchema = new mongoose.Schema({
  CustomerId: Number,
  Files: {
    Video: String,
    Subtitle: String,
  },
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  CustomerId: Number,
  Carts: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
});

//Define Mongoose Model
const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", VideoSchema);
const Sub = mongoose.model("Subtitle", SubSchema);
const Cart = mongoose.model("Cart", cartSchema);

export { User, Sub, Video, Cart };
