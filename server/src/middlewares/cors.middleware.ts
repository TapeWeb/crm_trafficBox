import cors from 'cors';
import { ENV } from '../config/env';

const allowedOrigins = [
  `http://localhost:${ENV.CLIENT_PORT}`,
  `http://172.19.0.2:${ENV.CLIENT_PORT}`
];

export const corsMiddleware = cors(
  {
    origin: (origin, callback) => {
      if(!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } return callback(new Error('CORS not allowed for this origin.'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });