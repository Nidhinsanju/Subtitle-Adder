import mongoose from "mongoose";

const SubSchema = new mongoose.Schema({
  SubID: Number,
  name: String,
  data: Buffer,
  contentType: String,
});

const VideoSchema = new mongoose.Schema({
  videID: Number,
  name: String,
  data: String,
  contentType: String,
});

const cartSchema = new mongoose.Schema({
  CustomerId: Number,
  Files: [
    {
      file: { type: mongoose.Schema.Types.ObjectId, ref: "Sub" }, // Reference to SubSchema
      fileType: { type: String, enum: ["sub"] },
    },
    {
      file: { type: mongoose.Schema.Types.ObjectId, ref: "Video" }, // Reference to VideoSchema
      fileType: { type: String, enum: ["video"] },
    },
  ],
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  CustomerId: Number,
  Cart: [cartSchema],
});

//Define Mongoose Model
const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", VideoSchema);
const Sub = mongoose.model("Subtitle", SubSchema);
const Cart = mongoose.model("Cart", cartSchema);

export { User, Sub, Video, Cart };
