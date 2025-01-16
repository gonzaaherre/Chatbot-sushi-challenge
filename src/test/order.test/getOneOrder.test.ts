import app from '../../app';
import { connectDB, disconnectDB } from '../../config/dbClient';
import supertest from 'supertest';
import Order from '../../models/order-model';

jest.mock("../../models/order-model", () => ({
    findById: jest.fn(),
}));

describe("OrderController", () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /orders/:id", () => {
        it("Debería retornar la orden correcta si existe", async () => {
            (Order.findById as jest.Mock).mockResolvedValueOnce({
                _id: "677ade022ade576368e2feb3",
                products: [
                    {
                        product: {
                            _id: "677ade022ade576368e2feaa",
                            name: "Nigiri de salmón",
                            description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco.",
                            price: 450,
                            category: "Nigiri",
                            available: true,
                        },
                        quantity: 2,
                    },
                    {
                        product: {
                            _id: "677ade022ade576368e2feab",
                            name: "Roll California",
                            description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                            price: 700,
                            category: "Rolls",
                            available: true,
                        },
                        quantity: 1,
                    },
                ],
                totalPrice: 1600,
                status: "pending",
                createdAt: "2025-01-05T19:31:14.556Z",
                updatedAt: "2025-01-05T19:31:14.556Z",
            });

            const response = await supertest(app).get("/orders/677ade022ade576368e2feb3");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                _id: "677ade022ade576368e2feb3",
                products: [
                    {
                        product: {
                            _id: "677ade022ade576368e2feaa",
                            name: "Nigiri de salmón",
                            description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco.",
                            price: 450,
                            category: "Nigiri",
                            available: true,
                        },
                        quantity: 2,
                    },
                    {
                        product: {
                            _id: "677ade022ade576368e2feab",
                            name: "Roll California",
                            description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                            price: 700,
                            category: "Rolls",
                            available: true,
                        },
                        quantity: 1,
                    },
                ],
                totalPrice: 1600,
                status: "pending",
                createdAt: "2025-01-05T19:31:14.556Z",
                updatedAt: "2025-01-05T19:31:14.556Z",
            });
        });

        it("Debería retornar 404 si no encuentra la orden", async () => {
            (Order.findById as jest.Mock).mockResolvedValueOnce(null);

            const response = await supertest(app).get("/orders/677ade022ade576368e2feb3");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Orden no encontrada");
        });

        it("Debería retornar 400 si el ID es inválido", async () => {
            const response = await supertest(app).get("/orders/invalidId");

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("ID inválido");
        });

        it("Debería manejar errores en caso de fallos en la base de datos", async () => {
            (Order.findById as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

            const response = await supertest(app).get("/orders/677ade022ade576368e2feb3");

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Error obteniendo orden por ID:");
            expect(response.body.error).toBe("Database error");
        });
    });
});
