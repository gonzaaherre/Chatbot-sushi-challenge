import { Router } from "express";
import productRoutes from "./FAQ-routes";
import faqRoutes from "./FAQ-routes";

const router = Router();

router.use("/api", faqRoutes);
router.use("/api", productRoutes);

export default router;
