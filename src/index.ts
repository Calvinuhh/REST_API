import server from "./app";
import dbConnect from "./database/db";

process.loadEnvFile();
const { PORT } = process.env;

dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}, node version: 22.12`);
    });
  })
  .catch((error) => {
    throw Error(error);
  });
