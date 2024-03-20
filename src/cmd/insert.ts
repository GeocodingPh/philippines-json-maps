import { disconnect } from "mongoose";
import { Resolution, outputFolder, readJson } from "../modules/combineGeoJson";
import { connectDB } from "../modules/connectDB";
import GeoModel from "../modules/geoSchema";
import * as fs from "fs";

export async function insert(resolution: Resolution) {
  const features: any[] = readJson(`./${outputFolder}/${resolution}.json`);
  const length = features.length;
  console.log("features :", length);
  await connectDB();

  const errorFetures: any[] = [];

  for (let i = 0; i < length; i++) {
    if (i > 0 && i < length) {
      process.stdout.moveCursor(0, -1); // up one line
      process.stdout.clearLine(1); // from cursor to end
    }
    console.log(i + 1, `/`, length);
    const f = new GeoModel(features[i]);
    try {
      await f.save();
    } catch (e) {
      errorFetures.push(features[i]);
    }
  }
  fs.writeFileSync(
    `./errorFeatures_${resolution}.json`,
    JSON.stringify(errorFetures)
  );

  await disconnect();
}
