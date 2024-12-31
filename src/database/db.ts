import { connect } from "mongoose";

const { DB_URI } = process.env as { DB_URI: string };

const dbConnect = async () => {
  try {
    await connect(DB_URI);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    const err = error as Error;
    console.log("Error al conectar a la base de datos");
    throw Error(err.message);
  }
};

export default dbConnect;
