import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user.routes.ts";
import offerRouter from "./routes/offer.router.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { corsMiddleware } from "./middlewares/cors.middleware.ts";
import globalLimiter from "./middlewares/limiter.middleware.ts";

const app: Application = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter)

app.use("/", userRoutes);
app.use("/", offerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Backend is working.",
    status: 200
  });
});

app.use(errorMiddleware);

export default app;
