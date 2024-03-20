import chalk from "chalk";
import { combineGeoJSON, resolutions } from "../modules/combineGeoJson";

export function combine() {
  for (const res of resolutions) {
    console.log(chalk.yellow(`${res} start`));
    combineGeoJSON(res);
  }
}
