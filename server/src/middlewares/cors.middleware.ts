import cors from 'cors';

const allowedOrigins = [
  `${process.env.VITE_CLIENT_API_URL}`,
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o.split(':')[0]))) {
      return callback(null, true);
    }
    console.error(`Blocked by CORS: ${origin}`);
    return callback(new Error('CORS not allowed for this origin.'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
