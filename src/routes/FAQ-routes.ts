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
/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - _id
 *         - question
 *         - answer
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la pregunta frecuente
 *         question:
 *           type: string
 *           description: Pregunta frecuente
 *         answer:
 *           type: string
 *           description: Respuesta a la pregunta frecuente
 *       example:
 *         _id: "677ade022ade576368e2fea4"
 *         question: "¿Cuáles son los horarios en que el local está abierto?"
 *         answer: "Estamos abiertos todos los días de 10:00 AM a 10:00 PM."
 */

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: Endpoints relacionados con preguntas frecuentes
 */

/**
 * @swagger
 * /faq:
 *   get:
 *     summary: Obtener todas las preguntas frecuentes
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: Lista de preguntas frecuentes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 */
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
