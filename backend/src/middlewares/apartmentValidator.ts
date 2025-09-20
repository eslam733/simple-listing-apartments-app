import { body, validationResult, CustomValidator } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import Apartment from "../models/Apartment";

// Custom validator to check if the apartment number is unique
const isNumberUnique: CustomValidator = async (value: string) => {
  try {
    const numberValue = Number(value);
    
    if (isNaN(numberValue)) {
      throw new Error("Apartment number must be a valid number");
    }

    const existingApartment = await Apartment.findOne({ number: numberValue });

    if (existingApartment) {
      throw new Error("Apartment number must be unique");
    }
  } catch (err) {
    throw new Error("Error while checking apartment number uniqueness");
  }
};

// Validation rules for apartment creation
export const validateApartment: RequestHandler[] = [
  body("number")
    .isNumeric().withMessage("Apartment number must be a number")
    .notEmpty().withMessage("Apartment number is required")
    .custom(isNumberUnique), // Unique check

  body("name")
    .isString().withMessage("Apartment name must be a string")
    .notEmpty().withMessage("Apartment name is required"),

  body("description")
    .isString().withMessage("Description must be a string")
    .trim().notEmpty().withMessage("Description is required"),

  body("price")
    .isNumeric().withMessage("Price must be a number")
    .notEmpty().withMessage("Price is required"),

  body("location")
    .isString().withMessage("Location must be a string")
    .trim().notEmpty().withMessage("Location is required"),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.status(422).json({ success: false, errors: errors.array() });
        return;
    }

    next();
  }
];
