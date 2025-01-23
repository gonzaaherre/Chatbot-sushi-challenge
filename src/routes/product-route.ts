import { Router } from "express";
import { ProductController } from "../controllers/product-controller";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();
const productController = new ProductController();

// Obtener todos los productos
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - description
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *       example:
 *         _id: "67896e9088c0e71a918eda70"
 *         name: "Nigiri de salmón"
 *         description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco."
 *         price: 450
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operaciones relacionadas con los productos
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get(
  "/menu",
  productController.getAllProductItems.bind(productController)
);

/**
 * @swagger
 * /menu/name:
 *   post:
 *     summary: Obtener un producto por nombre
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *         content:
 *           application/json:             
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

// Obtener un producto por nombre
router.post("/menu/name", (req, res, next) => {
  productController.getMenuItemByName(req, res, next);
});

//crear un nuevo producto del menú

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Crear un nuevo producto del menú
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 */
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
