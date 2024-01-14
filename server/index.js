import express from "express";
import cors from "cors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import { User, Sub, Video, Cart } from "./database/index.js";
import jwt from "jsonwebtoken";
import authenticateJwt, { SECRET } from "./middleware/auth.js";
// import { Logger } from "@aws-sdk/logger"; // Import the Logger class

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true })); // Create a Logger instance

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIA5SCI7IAH35UDDHOT",
    secretAccessKey: "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",
  },
});

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

app.post("/postdata", authenticateJwt, async (req, res) => {
  const { bVideo, bText, CustomerID } = req.body;
  const user = await User.findOne({ CustomerId: CustomerID });
  try {
    if (user) {
      const cart = await Cart.findOne({ CustomerId: CustomerID });
      const cartId = cart ? cart.CartID : undefined;
      if (!cart) {
        const newcart = new Cart({ CustomerId: CustomerID });
        await newcart.save();
      }

      if (bVideo && bText) {
        const videoKey = `${CustomerID}/video.mp4`;
        const subtitleKey = `${CustomerID}/subtitle.vtt`;

        const videoRef = await uploadToS3(bVideo, videoKey, "video/mp4");
        const subRef = await uploadToS3(
          Buffer.from(bText, "base64"),
          subtitleKey,
          "text/vtt"
        );

        async function uploadToS3(fileBuffer, key, contentType) {
          try {
            const params = {
              Bucket: "converterapp1",
              Key: key,
              Body: fileBuffer,
              ContentType: contentType,
            };

            const command = new PutObjectCommand(params);
            const res = await s3.send(command);

            const baseUrl = `https://converterapp1.s3.amazonaws.com/`;
            return `${baseUrl}${key}`;
          } catch (error) {
            res.status(500).json({ message: "error uploading in cloud" });
          }
        }

        Cart.findOneAndUpdate(
          { CustomerId: CustomerID },
          {
            $set: {
              "Files.Subtitle": subRef,
              "Files.Video": videoRef,
            },
          },
          { new: true, upsert: true }
        )
          .exec()
          .then((updatedCart) => {
            res.status(500).json({ message: "server errror" });
            // console.log("Cart updated successfully:");
          })
          .catch((error) => {
            res.status(501).json({ message: "uploading catch error" });
            // console.error("Error updating cart:", error);
          });

        res.status(200).json({ Message: "saved data", videoRef, subRef });
      } else {
        res.status(404).json({ message: "No input found" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "not saved" });
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
