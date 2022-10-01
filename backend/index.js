import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import * as fs from "fs";
import cors from "cors";

import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations/index.js";

// * DB CONNECTION
mongoose
  .connect(
    "mongodb+srv://seymur:vvttsszz@cluster0.hn6tojs.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log(err));

const app = express();

// * CREATE STORAGE FOR IMAGES
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

// * ADD PATH UPLOADS FOR ROUTING
app.use("/uploads", express.static("uploads"));

// * USER LOGIN
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

// * USER REGISTER
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

// * USER INFO
app.get("/auth/me", checkAuth, UserController.getMe);

// * CREATE POST
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

// * GET POST
app.get("/posts/:id", PostController.getOne);

// * GET ALL POSTS
app.get("/posts", PostController.getAll);

// * GET LAST TAGS
app.get("/tags", PostController.getLastTags);
app.get("/posts/tags", PostController.getLastTags);

// * UPDATE POST
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

// * DELETE POST
app.delete("/posts/:id", checkAuth, PostController.remove);

// * UPLOAD IMAGE
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// * LISTENING SERVER
app.listen(5000, (err) => {
  if (err) {
    return console.log("error");
  }

  console.log("Server OK");
});
