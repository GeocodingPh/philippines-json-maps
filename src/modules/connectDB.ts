import { connect } from "mongoose";
import env from "./env";

export async function connectDB() {
  const { mongoHost, mongoPort, mongoDatabase, mongoUsername, mongoPassword } =
    env;

  await connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`, {
    authSource: "admin",
    user: mongoUsername,
    pass: mongoPassword,
  });
}
