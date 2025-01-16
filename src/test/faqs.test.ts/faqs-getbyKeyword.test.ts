import faqItem from '../../models/faq-model';
import app from '../../app';
import { connectDB, disconnectDB } from '../../config/dbClient';
import supertest from 'supertest';

jest.mock("../../models/faq-model", () => ({
    find: jest.fn().mockResolvedValue([  //simulamos la db
        {
            "_id": "677ade022ade576368e2fea4",
            "question": "¿Cuáles son los horarios del local tienen abiertos abierto?",
            "answer": "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
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
        jest.clearAllMocks();
    });//sin esto los tests siguien corriendo una vez terminado

    describe("GET /faq", () => {
        it("Debería retornar la pregunta frecuente correcta", async () => {
            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    "_id": "677ade022ade576368e2fea4",
                    "question": "¿Cuáles son los horarios del local tienen abiertos abierto?",
                    "answer": "Estamos abiertos todos los días de 10:00 AM a 10:00 PM.",
                    "__v": 0
                }
            ]);
        });

        it("Debería retornar un array vacío si no hay preguntas frecuentes", async () => {
            // Mock de la función para devolver un array vacío
            (faqItem.find as jest.Mock).mockResolvedValueOnce([]);

            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);//array vacio
        });

        it("Debería retornar un error si hay un fallo al obtener las preguntas frecuentes", async () => {
            (faqItem.find as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

            const response = await supertest(app).get("/api/faq");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Error al obtener las preguntas frecuentes.",
                error: "Database error",
            });
        });
    });
});
