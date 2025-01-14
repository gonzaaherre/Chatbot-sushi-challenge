import request from "supertest";
import app from "../app"; // Ajusta la ruta según tu configuración
import { ProductService } from "../services/product-service";
import { ProductController } from "../controllers/product-controller";
// Mock de ProductService
jest.mock("../services/product-service");

describe("ProductController", () => {
    describe("GET /menu", () => {
        it("should return all products", async () => {
            // Mock de respuesta de productos
            const mockProducts = [
                { name: "Sushi Roll", description: "Delicious sushi", price: 10 },
                { name: "Tempura", description: "Crispy tempura", price: 8 },
            ];

            // Mock del método del servicio
            ProductService.prototype.getAllProductItems = jest
                .fn()
                .mockResolvedValue(mockProducts);

            const response = await request(app).get("/api/menu");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
            expect(ProductService.prototype.getAllProductItems).toHaveBeenCalled();
        });

        it("should return an empty array if no products found", async () => {
            ProductService.prototype.getAllProductItems = jest
                .fn()
                .mockResolvedValue([]);

            const response = await request(app).get("/api/menu");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});
