import mongoose, { mongo } from "mongoose";
import { StrictMode } from "react";

const extSubSchema = new mongoose.Schema({
  extSubID: Number,
  title: { type: String },
  description: { type: String },
});

const extVideoSchema = new mongoose.Schema({
  extvideID: Number,
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String },
});
const resultVideoSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String },
});
const cartSchema = new mongoose.Schema({
  CustomerId: Number,
  Video: [extVideoSchema],
  Subtitle: [extSubSchema],
  Output: [resultVideoSchema],
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  CustomerId: Number,
  Cart: [cartSchema],
});

//Define Mongoose Model
const User = mongoose.model("User", userSchema);
const ExtVideos = mongoose.model("Videos", extVideoSchema);
const ExtSub = mongoose.model("Subtitle", extSubSchema);
const OutputVid = mongoose.model("Output", resultVideoSchema);
const Cart = mongoose.model("Cart", cartSchema);

export { User, OutputVid, ExtSub, ExtVideos, Cart };
