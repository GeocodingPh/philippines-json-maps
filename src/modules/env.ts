import * as dotenv from "dotenv";

type Env = {
  mongoHost: string;
  mongoPort: number;
  mongoUsername: string;
  mongoPassword: string;
  mongoDatabase: string;
  mongoCollection: string;
};

let configCalled = false;

function getEnv(): Env {
  if (!configCalled) {
    dotenv.config();
    configCalled = true;
  }
  const keys = [
    "MONGO_HOST",
    "MONGO_PORT",
    "MONGO_USERNAME",
    "MONGO_PASSWORD",
    "MONGO_DATABASE",
    "MONGO_COLLECTION",
  ];

  function snakeToCamel(str: string) {
    return str.toLowerCase().replace(/(_\w)/g, (m) => m[1].toUpperCase());
  }

  return keys
    .map((key) => {
      if (!process.env[key]) {
        throw Error(`env.${key} is undefined`);
      }
      const camelKey = snakeToCamel(key);
      return { camelKey, value: process.env[key]! };
    })
    .reduce((prev, curr) => {
      prev[curr.camelKey] = curr.value;
      return prev;
    }, {} as { [k: string]: any }) as Env;
}

const env = getEnv();
export default env;
