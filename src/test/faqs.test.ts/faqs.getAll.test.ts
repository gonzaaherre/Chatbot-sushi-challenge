import supertest from "supertest";
import { connectDB, disconnectDB } from "../../config/dbClient";
import app from "../../app"; // Importa aplicación
import faqItem from "../../models/faq-model";

jest.mock("../../models/faq-model", () => ({
    find: jest.fn().mockResolvedValue([
        {
            "_id": "677ade022ade576368e2fea3",
            "question": "¿Qué tipos de sushi ofrecen tienen?",
            "answer": "Ofrecemos sushi tradicional, makis, nigiris y más.",
            "__v": 0
        },
        {
            "_id": "677ade022ade576368e2fea4",
            "question": "¿Cuáles son los horarios del local tienen abiertos abierto?",
            "answer": "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
            "__v": 0
        },
        {
            "_id": "677ade022ade576368e2fea5",
            "question": "¿Puedo hacer un pedido en linea online?",
            "answer": "Sí, puedes hacer pedidos en línea a través de nuestra página web.",
            "__v": 0
        },
        {
            "_id": "677ade022ade576368e2fea6",
            "question": "¿Tienen opciones para vegetarianos?",
            "answer": "Sí, ofrecemos opciones vegetarianas y veganas.",
            "__v": 0
        },
        {
            "_id": "677ade022ade576368e2fea7",
            "question": "¿Realizan entregas a domicilio?",
            "answer": "Sí, ofrecemos servicio de entrega a domicilio en varias zonas.",
            "__v": 0
        },
        {
            "_id": "677ade022ade576368e2fea8",
            "question": "¿Cuánto tarda tardan la entrega?",
            "answer": "El tiempo de entrega varía entre 30 a 45 minutos, dependiendo de la zona.",
            "__v": 0
        }
    ])
}));

describe("FAQController ", () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks после каждого теста
    });

    describe("GET /faq", () => {
        it("Debería retornar todas las preguntas frecuentes", async () => {
            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    "_id": "677ade022ade576368e2fea3",
                    "question": "¿Qué tipos de sushi ofrecen tienen?",
                    "answer": "Ofrecemos sushi tradicional, makis, nigiris y más.",
                    "__v": 0
                },
                {
                    "_id": "677ade022ade576368e2fea4",
                    "question": "¿Cuáles son los horarios del local tienen abiertos abierto?",
                    "answer": "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
                    "__v": 0
                },
                {
                    "_id": "677ade022ade576368e2fea5",
                    "question": "¿Puedo hacer un pedido en linea online?",
                    "answer": "Sí, puedes hacer pedidos en línea a través de nuestra página web.",
                    "__v": 0
                },
                {
                    "_id": "677ade022ade576368e2fea6",
                    "question": "¿Tienen opciones para vegetarianos?",
                    "answer": "Sí, ofrecemos opciones vegetarianas y veganas.",
                    "__v": 0
                },
                {
                    "_id": "677ade022ade576368e2fea7",
                    "question": "¿Realizan entregas a domicilio?",
                    "answer": "Sí, ofrecemos servicio de entrega a domicilio en varias zonas.",
                    "__v": 0
                },
                {
                    "_id": "677ade022ade576368e2fea8",
                    "question": "¿Cuánto tarda tardan la entrega?",
                    "answer": "El tiempo de entrega varía entre 30 a 45 minutos, dependiendo de la zona.",
                    "__v": 0
                }
            ]);
        });
        it("Debería retornar un array vacío si no hay preguntas frecuentes", async () => {
            // Mock de la función para devolver un array vacío
            (faqItem.find as jest.Mock).mockResolvedValueOnce([]);

            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]); // Verifica que se devuelva un array vacío
        });

        it("Debería retornar un error si hay un fallo al obtener las preguntas frecuentes", async () => {
            // Mock de la función para simular un error
            (faqItem.find as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Error al obtener las preguntas frecuentes.",
                error: "Database error",
            });
        });
    });
})

