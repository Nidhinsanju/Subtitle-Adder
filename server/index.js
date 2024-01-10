import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User, OutputVid, ExtSub, ExtVideos, Cart } from "./database/index.js";
import jwt from "jsonwebtoken";
import authenticateJwt, { SECRET } from "./middleware/auth.js";
import multer from "multer";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "subtitle", maxCount: 1 },
]);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const CustomerId = Math.floor(Math.random() * 10000);
    const newUser = new User({ username, password, CustomerId });
    await newUser.save();
    const token = jwt.sign({ username, role: "user", CustomerId }, SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "User created successfully", token, CustomerId });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  const CustomerID = user.CustomerId;
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Logged in successfully", token, CustomerID });
  } else {
    res.status(403).json({ message: "Invalid username or passoword" });
  }
});

// app.post("/getdata1", async (req, res) => {
//   const videoSrc = req.body.video;
//   const subSrc = req.body.text;
//   res.status(200).json({ message: "hy itss okay" });
// });

app.post("/getdata", upload, authenticateJwt, async (req, res) => {
  const video = req.files.video[0];
  const text = req.files.subtitle[0];
  const CustomerId = req.body.CustomerID;
  const user = await User.findOne({ CustomerId });
  const cart = await Cart.findOne({ CustomerId });
  try {
    if (cart) {
      await cart.save();
    }
    if (!cart) {
      const newcart = new Cart({ CustomerId });
      await newcart.save();
    }

    if (video && text) {
      const newVideo = new ExtVideos(video);
      const newSub = new ExtSub(text);
      cart.Video.push(newVideo);
      cart.Subtitle.push(newSub);
      await cart.save();
      res.status(200).json({ Message: "saved" });
      await user.save();
    } else {
      res.status(404).json({ message: "No input found" });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ message: "not saved" });
  }
});
//..........................................................................

//.........................................................................
mongoose.connect(
  "mongodb+srv://Nidhin_5656:TN37DB8220@cluster0.anuhjsu.mongodb.net/",
  {
    dbName: "Videouploader",
  }
);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
