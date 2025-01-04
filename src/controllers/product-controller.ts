import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { CreateProductItemDTO } from "../DTOs/product/createProductDto";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  async getAllProductItems(req: Request, res: Response) {
    try {
      const products = await this.productService.getAllProductItems();
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener los productos del menú" });
    }
  }

  async getMenuItemByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const product = await this.productService.getMenuItemByName(name);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("[ProductController] - Error en getMenuItemByName:", error);
      res.status(500).json({ error: "Error al buscar el producto" });
    }
  }

  // Crear un nuevo producto del menú
  async createMenuItem(req: Request, res: Response) {
    const productData: CreateProductItemDTO = req.body;
    try {
      const newProduct = await this.productService.createMenuItem(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto del menú" });
    }
  }
}
