import supertest from "supertest";
import { connectDB, disconnectDB } from "../../config/dbClient";
import app from "../../app";
import ProductItem from "../../models/product-model";

jest.mock("../../models/product-model", () => ({
    findOne: jest.fn(),
}));

describe("ProductController - POST /menu/name", () => {
    //conectar a la base de datos antes de todos los tests
    beforeAll(async () => {
        await connectDB();
    });

    //desconectar de la base de datos después de todos los tests
    afterAll(async () => {
        await disconnectDB();
    });
    afterEach(() => {
        jest.clearAllMocks(); //limpia los mocks después de cada test
    });

    it("debería retornar un producto cuando se envía un nombre válido", async () => {
        const mockProduct = {
            _id: "677ade022ade576368e2feab",
            name: "Roll California",
            price: 700,
        };

        (ProductItem.findOne as jest.Mock).mockResolvedValue(mockProduct);

        const response = await supertest(app)
            .post("/api/menu/name")
            .send({ name: "Roll California" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            name: "Roll California",
            id: "677ade022ade576368e2feab",
            price: 700,
        });
    });

    it("debería retornar un error 400 si no se envía el nombre del producto", async () => {
        const response = await supertest(app).post("/api/menu/name").send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "El nombre del producto es requerido",
        });
    });



    it("debería retornar un error 404 si el producto no existe", async () => {
        (ProductItem.findOne as jest.Mock).mockResolvedValue(null);

        const response = await supertest(app)
            .post("/api/menu/name")
            .send({ name: "Producto Inexistente" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Producto no encontrado" });
    });



    it("debería retornar un error 500 si ocurre un error en el servidor", async () => {
        (ProductItem.findOne as jest.Mock).mockRejectedValue(
            new Error("Error del servidor")
        );

        const response = await supertest(app)
            .post("/api/menu/name")
            .send({ name: "Roll California" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Error al buscar el producto",
        });
    });
});
