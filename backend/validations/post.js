import { body } from "express-validator";

// * VALIDATION CREATE
export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }),
  body("text", "Введите текст статьи").isLength({
    min: 3,
  }),
  body("tags", "Неверный формат тэгов (укажите массив)").optional(),
  body("imageUrl", "Неверная ссылка на изображения").optional().isString(),
];
