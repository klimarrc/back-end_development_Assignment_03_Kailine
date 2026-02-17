import express, { Express } from "express";


const app: Express = express();

app.use(express.json()); //  use JSON body parsing

// GET request at the app root
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Health check route
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Export the app
export default app;