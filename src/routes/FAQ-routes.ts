import { Router } from "express";
import { FAQController } from "../controllers/FAQ-controller";
import { body, query } from "express-validator";
import { validate } from "../middleware/validate";
import {
  createFAQValidator,
  searchFAQValidator,
} from "../middleware/FAQ-validator";

const router = Router();
const faqController = new FAQController();

// Obtener todas las preguntas frecuentes
router.get("/faq", faqController.getAllFAQsController.bind(faqController));

// Buscar una pregunta específica por palabra clave
// router.get(
//   "/faq/search",
//   searchFAQValidator,
//   faqController.getFAQByKeywordController.bind(faqController)
// );


//pregunta por palabra clave
router.post("/faq/search", (req, res, next) => {
  faqController.getFAQByKeywordController(req, res, next);
});

// Crear una nueva pregunta frecuente
router.post(
  "/faq",
  createFAQValidator,
  faqController.createFAQController.bind(faqController)
);

export default router;
