import chalk from "chalk";
import { disconnect } from "mongoose";
import { combine } from "./cmd/combine";
import { connectDB } from "./modules/connectDB";
import { search } from "./cmd/search";
import { insert } from "./cmd/insert";
import { resolutions, supportResolution } from "./modules/combineGeoJson";

async function main() {
  const commands = ["combineJson", "insert", "search"];

  if (process.argv.length < 3) {
    console.log(chalk.red(`insert command : ${commands.join(" | ")}`));
    return;
  }

  const command = process.argv[2];
  if (!commands.includes(command)) {
    console.log(chalk.red(`unsupported command : ${commands.join(" | ")}`));
    return;
  }

  if (command === "combineJson") {
    combine();
  } else if (command === "insert") {
    if (process.argv.length < 4 || !supportResolution(process.argv[3])) {
      console.log(chalk.red(`resolution : ${resolutions.join(" | ")}`));
      return;
    }

    await insert(process.argv[3]);
  } else if (command === "search") {
    if (process.argv.length < 5) {
      console.log(
        chalk.red(
          `latitude and longitude are not provided : search latitude longitude`
        )
      );
      return;
    }
    //   10.2718312 123.8559964 // inayawan
    //   10.4239188 123.9963807 // jubay
    //   10.4239999 123.9968147 // CotCot
    //   10.3108296 123.8971717 // horizon
    await search(Number(process.argv[3]), Number(process.argv[4]));
  }
}

main();
