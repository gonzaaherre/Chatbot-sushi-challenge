import { Router } from "express";
import productRoutes from "./product-route";
import faqRoutes from "./FAQ-routes";
import orderRoutes from "./order-routes";

const router = Router();

router.use(faqRoutes);
router.use(productRoutes);
router.use(orderRoutes);

export default router;
