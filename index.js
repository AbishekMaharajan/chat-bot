import dotenv from "dotenv";
import colors from "colors";

import server from "./server.js";

dotenv.config();

const port = process.env.PORT || 4000;

const startServer = () => {
  server.listen(port, () => {
    console.log(colors.blue.bold(`Server running at http://localhost:${port}`));
  });
};

startServer();
