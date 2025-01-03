import { body, query } from "express-validator";

// Validación para crear una nueva FAQ
export const createFAQValidator = [
  body("question")
    .isString()
    .notEmpty()
    .withMessage("La pregunta es obligatoria"),
  body("answer")
    .isString()
    .notEmpty()
    .withMessage("La respuesta es obligatoria"),
];

// Validación para buscar FAQ por palabra clave
export const searchFAQValidator = [
  query("keyword")
    .isString()
    .notEmpty()
    .withMessage("Se debe proporcionar un término de búsqueda"),
];
