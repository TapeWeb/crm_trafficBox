import cors from "cors";
import { ENV } from "../config/env.ts"

export const corsMiddleware = cors({
  origin: `http://localhost:${ENV.CLIENT_PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

