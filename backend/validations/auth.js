import { body } from "express-validator";

// * VALIDATION REGISTRATION FIELDS
export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть миннимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

// * VALIDATION LOGIN FIELDS
export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть миннимум 5 символов").isLength({
    min: 5,
  }),
];
