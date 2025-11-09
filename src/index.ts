import express from "express";
import cors from "cors";
import configs from "./configs";
// Import function to test connection (no need to import prisma if not used in index.ts)
import { testDatabaseConnection } from "./utils/prisma";
// Import routes
import userRoutes from "./routes/user.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

app.get(
  "/",
  (req, res) => {
    res.send("Hello World bro 1!");
  }
);

app.get("/hello", (req, res) => {
  res.status(403).json({
    message: "Hello World ok bro!",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Export app for Vercel serverless functions
export default app;

// Start server locally (not on Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(configs.port, async () => {
    console.log(`Example app listening on port ${configs.port}`);
    
    // Test database connection when app starts
    // This ensures database errors are detected early instead of waiting for the first request
    const isConnected = await testDatabaseConnection();
    if (isConnected) {
      console.log('✅ Prisma Client ready (database connected)');
    }
  });
}
