import express, { Express } from "express";
import dotenv from 'dotenv';

dotenv.config();
import eventPostRoutes from "./api/v1/routes/eventPostRoutes";
import morgan from "morgan";
//import { getHelmetConfig } from "../config/helmetConfig";
import setupSwagger from "../config/swagger";
import helmet from "helmet";
import cors from "cors";
import { getCorsOptions } from "../config/corsConfig";


const app: Express = express();
const isDevelopment = app.get('env') === 'development';

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
                frameAncestors: ["'none'"],
                objectSrc: ["'none'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "https:"],
                imgSrc: ["'self'", "data:"],
                upgradeInsecureRequests: isDevelopment ? null : [],
            },
        },

        // APIs usually should not be framed
        xFrameOptions: { action: 'deny' },

        // Avoid MIME-type sniffing
        xContentTypeOptions: true,

        // Limit referrer information
        referrerPolicy: { policy: 'no-referrer' },

        // Force HTTPS in production
        strictTransportSecurity: isDevelopment
            ? false
            : {
                maxAge: 31536000,
                includeSubDomains: true,
            },

        // Keep resources same-origin unless you know you need otherwise
        crossOriginResourcePolicy: { policy: 'same-origin' },

        // Optional privacy hardening
        xDnsPrefetchControl: { allow: false },

        // Good default for old clients / plugins
        xPermittedCrossDomainPolicies: { permittedPolicies: 'none' },
    })
);
app.set("json spaces", 2); // set JSON response indentation to 2 spaces for readability
app.use(cors(getCorsOptions())); //  use CORS to allow cross-origin requests
app.use(express.json()); //  use JSON body parsing


app.use(morgan("combined")); //  use morgan for logging


// GET request at the app root
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Health check route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1/events", eventPostRoutes);

// Setup Swagger
setupSwagger(app);

// Export the app
export default app;