import supertest from "supertest";
import { connectDB, disconnectDB } from "../../config/dbClient";
import app from "../../app"; // Importa tu aplicación
import ProductItem from "../../models/product-model"; // Modelo de producto

jest.mock("../../models/product-model", () => ({

    find: jest.fn().mockReturnThis(), // Simula el método `find` y devuelve `this` para poder encadenar el `.select()`
    select: jest.fn().mockResolvedValue([
        {
            _id: "677ade022ade576368e2feaa",
            name: "Nigiri de salmón",
            description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco.",
            price: 450
        },
        {
            _id: "677ade022ade576368e2feab",
            name: "Roll California",
            description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
            price: 700
        },
        {
            _id: "677ade022ade576368e2feac",
            name: "Roll Tempura",
            description: "Roll frito con camarón, queso crema y salsa teriyaki.",
            price: 800
        },
        {
            _id: "677ade022ade576368e2fead",
            name: "Sashimi de atún",
            description: "Láminas frescas de atún rojo servidas con wasabi y salsa de soja.",
            price: 900
        },
        {
            _id: "677ade022ade576368e2feae",
            name: "Combo Familiar",
            description: "50 piezas de sushi mixto: rolls, nigiris y sashimi.",
            price: 4500
        },
        {
            _id: "677ade022ade576368e2feaf",
            name: "Gyozas de cerdo",
            description: "Empanaditas japonesas rellenas de cerdo y vegetales.",
            price: 600
        }
    ]), // Simula la respuesta de `select()`
}));

describe("ProductController", () => {
    // Conectar a la base de datos antes de todos los tests
    beforeAll(async () => {
        await connectDB();
    });

    // Desconectar de la base de datos después de todos los tests
    afterAll(async () => {
        await disconnectDB();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada test
    });

    describe("GET /menu", () => {
        it("should return all products", async () => {
            const response = await supertest(app).get("/api/menu");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    _id: "677ade022ade576368e2feaa",
                    name: "Nigiri de salmón",
                    description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco.",
                    price: 450
                },
                {
                    _id: "677ade022ade576368e2feab",
                    name: "Roll California",
                    description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                    price: 700
                },
                {
                    _id: "677ade022ade576368e2feac",
                    name: "Roll Tempura",
                    description: "Roll frito con camarón, queso crema y salsa teriyaki.",
                    price: 800
                },
                {
                    _id: "677ade022ade576368e2fead",
                    name: "Sashimi de atún",
                    description: "Láminas frescas de atún rojo servidas con wasabi y salsa de soja.",
                    price: 900
                },
                {
                    _id: "677ade022ade576368e2feae",
                    name: "Combo Familiar",
                    description: "50 piezas de sushi mixto: rolls, nigiris y sashimi.",
                    price: 4500
                },
                {
                    _id: "677ade022ade576368e2feaf",
                    name: "Gyozas de cerdo",
                    description: "Empanaditas japonesas rellenas de cerdo y vegetales.",
                    price: 600
                }
            ]);
        });

        it("should return an empty array if no products found", async () => {
            // Modificamos el mock para simular que no hay productos
            (ProductItem.find as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockResolvedValue([]),
            });

            const response = await supertest(app).get("/api/menu");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]); // Verifica que se devuelva un array vacío
        });
    });
});
