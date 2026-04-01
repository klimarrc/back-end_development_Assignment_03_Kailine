import swaggerJsdoc from "swagger-jsdoc";


const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API Documentation",
            version: "1.0.0",
            description: "Developed by Student: 0385052",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "John Doe",
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            example: "2024-06-01T12:00:00Z",
                        },
                        status: {
                            type: "string",
                            enum: ["active", "cancelled", "completed"],
                            example: "active",
                        },
                        category: {
                            type: "string",
                            enum: ["general", "conference", "workshop", "meetup"],
                            example: "general",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-06-01T12:00:00Z",
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Invalid input data",
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
