import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User, Videos } from "./database/index.js";
import jwt from "jsonwebtoken";
import authenticateJwt, { SECRET } from "./middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hi" });
// });

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

app.post("/addsub", authenticateJwt, async (req, res) => {
  const { videoSrc, subSrc } = req.body;
  res.status(200).json({ message: "hy itss okay" });
  const videoData = req.body.video;
  console.log(videoData);
});

mongoose.connect(
  "mongodb+srv://Nidhin_5656:TN37DB8220@cluster0.anuhjsu.mongodb.net/",
  {
    dbName: "Videouploader",
  }
);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
