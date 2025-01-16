import supertest from "supertest";
import { connectDB, disconnectDB } from "../../config/dbClient";
import app from "../../app";
import Order from "../../models/order-model";

jest.mock("../../models/order-model", () => ({
    find: jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue([
            {
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
                            __v: 0,
                        },
                        quantity: 2,
                        _id: "677ade022ade576368e2feb4",
                    },
                    {
                        product: {
                            _id: "677ade022ade576368e2feab",
                            name: "Roll California",
                            description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                            price: 700,
                            category: "Rolls",
                            available: true,
                            __v: 0,
                        },
                        quantity: 1,
                        _id: "677ade022ade576368e2feb5",
                    },
                ],
                totalPrice: 1600,
                status: "pending",
                __v: 0,
                createdAt: "2025-01-05T19:31:14.556Z",
                updatedAt: "2025-01-05T19:31:14.556Z",
            },
            {
                _id: "677ade022ade576368e2feb6",
                products: [
                    {
                        product: {
                            _id: "677ade022ade576368e2feab",
                            name: "Roll California",
                            description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                            price: 700,
                            category: "Rolls",
                            available: true,
                            __v: 0,
                        },
                        quantity: 3,
                        _id: "677ade022ade576368e2feb7",
                    },
                ],
                totalPrice: 2100,
                status: "completed",
                __v: 0,
                createdAt: "2025-01-05T19:31:14.557Z",
                updatedAt: "2025-01-05T19:31:14.557Z",
            },
        ]),
    })),
}));

describe("OrderController", () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    describe("GET /orders", () => {
        it("Debería retornar todos los pedidos con sus productos", async () => {
            const response = await supertest(app).get("/api/orders");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
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
                                __v: 0,
                            },
                            quantity: 2,
                            _id: "677ade022ade576368e2feb4",
                        },
                        {
                            product: {
                                _id: "677ade022ade576368e2feab",
                                name: "Roll California",
                                description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                                price: 700,
                                category: "Rolls",
                                available: true,
                                __v: 0,
                            },
                            quantity: 1,
                            _id: "677ade022ade576368e2feb5",
                        },
                    ],
                    totalPrice: 1600,
                    status: "pending",
                    __v: 0,
                    createdAt: "2025-01-05T19:31:14.556Z",
                    updatedAt: "2025-01-05T19:31:14.556Z",
                },
                {
                    _id: "677ade022ade576368e2feb6",
                    products: [
                        {
                            product: {
                                _id: "677ade022ade576368e2feab",
                                name: "Roll California",
                                description: "Roll con arroz, alga nori, palta, queso crema y kanikama.",
                                price: 700,
                                category: "Rolls",
                                available: true,
                                __v: 0,
                            },
                            quantity: 3,
                            _id: "677ade022ade576368e2feb7",
                        },
                    ],
                    totalPrice: 2100,
                    status: "completed",
                    __v: 0,
                    createdAt: "2025-01-05T19:31:14.557Z",
                    updatedAt: "2025-01-05T19:31:14.557Z",
                },
            ]);
        });

        it("Debería retornar un error si ocurre un fallo al obtener los pedidos", async () => {
            (Order.find as jest.Mock).mockImplementationOnce(() => ({
                populate: jest.fn().mockRejectedValueOnce(new Error("Database error")),
            }));

            const response = await supertest(app).get("/api/orders");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: "Error al obtener los pedidos",
            });
        });
    });
});