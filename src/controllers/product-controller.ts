// src/controllers/ProductController.ts
import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { ProductCreateDTO } from "../DTOs/product/createProductDto"; // Importamos el DTO para usarlo

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Método para crear un producto
  async createProduct(req: Request, res: Response) {
    const productData: ProductCreateDTO = req.body; // Usamos el DTO para tipar la entrada

    try {
      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json(newProduct); // Devolvemos el producto creado
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto" });
    }
  }
}
