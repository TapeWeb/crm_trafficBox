import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user.routes.ts";
import offerRouter from "./routes/offer.router.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { corsMiddleware } from "./middlewares/core.middleware.ts";

const app: Application = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);

app.use("/", userRoutes);
app.use("/", offerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

app.use(errorMiddleware);

export default app;
