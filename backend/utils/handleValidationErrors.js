import { validationResult } from "express-validator";

// * CHECKING ERRORS
export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};
