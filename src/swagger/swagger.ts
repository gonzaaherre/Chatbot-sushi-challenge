import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chatbot Sushi Prueba Tecnica',
            version: '1.0.0',
            description: 'API para el chatbot de Sushi Prueba Tecnica',
            contact: {
                name: 'Gonzalo Herrera',
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'API local server'
            }
        ],
    },
    apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);