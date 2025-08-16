import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();
  app.listen(ENV.SERVER_PORT, () => {
    console.log(`Server started on http://localhost:${ENV.SERVER_PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
