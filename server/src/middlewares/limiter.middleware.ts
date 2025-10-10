import rateLimit from 'express-rate-limit'

const globalLimiter = rateLimit({
  limit: 100,
  message: 'Too many requests from this IP.',
});

export default globalLimiter;