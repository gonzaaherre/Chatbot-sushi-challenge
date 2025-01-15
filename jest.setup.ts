jest.mock("./src/config/dbClient.ts", () => ({
    connectDB: jest.fn().mockResolvedValue(true), // Simulamos que la conexión es exitosa
}));