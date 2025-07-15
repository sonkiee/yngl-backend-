import app from "./app";

(async () => {
  try {
    app.listen(300, () => {
      console.log("🚀 Server is running");
    });
  } catch (error) {
    console.error("❌ Error starting server: ", error);
  }
})();
