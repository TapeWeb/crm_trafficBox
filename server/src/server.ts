import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();
  app.listen(ENV.VITE_SERVER_PORT, () => {
    console.log(`Server started on ${ENV.VITE_SERVER_API_URL}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
