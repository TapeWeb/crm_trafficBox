import app from "./app";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();
  app.listen(process.env.VITE_SERVER_PORT, () => {
    console.log(`Server started on ${process.env.VITE_SERVER_API_URL}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
