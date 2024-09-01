const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const path = require("path");
const { URL } = require("url");
const User = require("./models/User");
const Places = require("./models/Places");

const cookieParser = require("cookie-parser"); //to store the token in the browser
const secretkey =
  "'78fbf61bd7b88308c3d5789a52a6c337c18038f8b5824f1713e1b16e4289164d'";

//instantiation
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //to communicate with react
app.use(express.json()); //to parse the react input
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads/"));
require("dotenv").config();
//multer configuration
const storage = multer.diskStorage({
  destination: __dirname + "/uploads/",

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});
//middlewares

//mongodb connection
mongoose.connect(
  "mongodb+srv://aavash:AP8MzVLT7ViR0Api@booking.1kqddq0.mongodb.net/"
);

//register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const bcryptSalt = await bcrypt.genSalt();
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        jwt.sign(
          { email: user.email, id: user._id },
          secretkey,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpOnly: true }).json(user);
            res.status(401).json({ message: "Invalid Password" });
          }
        );
      } else {
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretkey, { httpOnly: true }, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-photo-link", async (req, res) => {
  try {
    const { link } = req.body;
    //url validation
    const url = new URL(link);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return res.status(400).json({ error: "Invalid URL protocol" });
    }
    const newName = "place-photo" + Date.now() + ".jpg";
    const options = {
      url: link,
      dest: __dirname + "/uploads/" + newName,
    };
    await imageDownloader.image(options);
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/photo-upload", upload.array("photos", 10), (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename); //since it is in array
    res.json({ filenames });
    // res.json(req.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/places", (req, res) => {
  const {
    title,
    address,
    description,
    addedPhoto,
    checkInTime,
    checkOutTime,
    maxGuests,
    extraInfo,
    perks,
  } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretkey, { httpOnly: true }, async (err, user) => {
      if (err) throw err;
      Places.create({
        owner: user.id,
        title,
        address,
        description,
        addedPhoto,
        checkInTime,
        checkOutTime,
        maxGuests,
        extraInfo,
        perks,
      });
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running in 8080");
});
