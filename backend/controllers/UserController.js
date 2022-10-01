import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

// * REGISTER
export const register = async (req, res) => {
  try {
    // * HASHING PASSWORD
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // * CREATE USER DATA
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    // * SENDING DATA TO MONGODB
    const user = await doc.save();

    // * CREATE TOKEN
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "vvttsszz",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    // * ERROR RESPONSE
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

// * LOGIN
export const login = async (req, res) => {
  try {
    // * FIND USER IN DB
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    // * MATCHING USER PASSWORD
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    // * CREATE TOKEN
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "vvttsszz",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

// * USER INFO
export const getMe = async (req, res) => {
  // * FIND USER IN DB
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (err) {
    // * ERROR RESPONSE
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};
