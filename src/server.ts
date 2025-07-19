import app from "./app";
import { connectDB } from "./config/db";

(async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("🚀 Server is running");
    });
  } catch (error) {
    console.error("❌ Error starting server: ", error);
  }
})();
