import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User, Sub, Video, Cart } from "./database/index.js";
import jwt from "jsonwebtoken";
import authenticateJwt, { SECRET } from "./middleware/auth.js";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
// const storage = multer.memoryStorage();
// const upload = multer({
//   limits: { fieldSize: 2 * 1024 * 1024 },
// }).fields([
//   { name: "video", maxCount: 1 },
//   { name: "subtitle", maxCount: 1 },
// ]);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
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

app.post("/postdata", authenticateJwt, async (req, res) => {
  const { bVideo, bText, CustomerID } = req.body;
  const user = await User.findOne({ CustomerId: CustomerID });
  try {
    if (user) {
      let cart = await Cart.findOne({ CustomerId: CustomerID });

      if (!cart) {
        const newcart = new Cart({ CustomerId: CustomerID });
        await newcart.save();
      }

      if (bVideo && bText) {
        const decodedVideoData = Buffer.from(bVideo, "base64");
        const newVideo = new Video({
          name: "video.mp4",
          data: decodedVideoData,
          contentType: "video/mp4",
        });

        cart.Video.push(newVideo);

        const newSub = new Sub({
          name: "subtitle.vtt",
          data: bText,
          contentType: "text/vtt",
        });
        cart.Subtitle.push(newSub);

        await cart.save();
        await user.save();

        res.status(200).json({ Message: "saved" });
      } else {
        res.status(404).json({ message: "No input found" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ message: "not saved" });
  }
});

app.post("/showdata", authenticateJwt, async (req, res) => {
  const customerID = req.body.CustomerID;
  const user = User.findOne({ customerID });
  try {
    if (user) {
      const cart = await Cart.findOne({ customerID }).lean();
      res.status(200).json({ cart });
    }
  } catch (error) {
    res.status(304).json({ message: "internal server error", error });
  }
});
//..........................................................................

//.........................................................................
mongoose.connect(
  "mongodb+srv://Nidhin_5656:TN37DB8220@cluster0.anuhjsu.mongodb.net/",
  {
    dbName: "Converter",
  }
);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
