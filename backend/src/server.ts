import { PORT } from "./config";
import app from "./app";

if (PORT) {
  app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`);
  });
} else {
  console.log("Server PORT not specified ...");
}
