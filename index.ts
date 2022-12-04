import app from "./src/app";
import dotenv from "dotenv";
import logger from "./src/utils/logger";

dotenv.config();

const PORT = process.env.PORT || 8000;
app.listen(PORT, (): void => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
