import { Router } from "express";
import { ProductController } from "../controllers/product-controller";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();
const productController = new ProductController();

// Obtener todos los productos
router.get(
  "/menu",
  productController.getAllProductItems.bind(productController)
);

// Obtener un producto por nombre
router.post("/menu/name", (req, res, next) => {
  productController.getMenuItemByName(req, res, next);
});

//crear un nuevo producto del menú
router.post(
  "/menu",
  body("name").isString().notEmpty().withMessage("El nombre es obligatorio"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("La descripción es obligatoria"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("category")
    .isString()
    .notEmpty()
    .withMessage("La categoría es obligatoria"),
  productController.createMenuItem.bind(productController)
);

export default router;
