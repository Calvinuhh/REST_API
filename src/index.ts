import server from "./app";
import dbConnect from "./database/db";
import createUploadsDir from "./script";

process.loadEnvFile();
const { PORT } = process.env;

dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `Servidor escuchando en el puerto ${PORT}, node version: 22.12`
      );
    });
    createUploadsDir();
  })
  .catch((error) => {
    throw Error(error);
  });
