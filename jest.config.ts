export default {
    preset: 'ts-jest', // Usa ts-jest como preset
    testEnvironment: 'node', // Entorno de prueba
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensiones soportadas
    transform: {
        '^.+\\.ts$': 'ts-jest', // Transforma archivos TypeScript usando ts-jest
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Alias para resolver imports relativos
    },
    transformIgnorePatterns: ['/node_modules/'], // Ignora transformación en node_modules
};
