import * as fs from "fs";
import { globSync } from "glob";

export type Resolution = "hires" | "medres" | "lowres";
export const resolutions: Resolution[] = ["hires", "medres", "lowres"];
export const outputFolder = `combinedGeoJson`;

export function supportResolution(resolution: any): resolution is Resolution {
  return resolutions.includes(resolution);
}

export function readJson(file: string) {
  const content = fs.readFileSync(file, { encoding: "utf-8" });
  try {
    return JSON.parse(content);
  } catch {
    throw Error(`Cannot parse json file ${file}`);
  }
}

export function combineGeoJSON(resolution: Resolution) {
  let files = globSync([
    `./2023/geojson/{country,regions,provdists,municities}/${resolution}/*.json`,
  ]);
  console.log(files.length);
  let items: any[] = [];
  const excludedFiles: string[] = [];
  for (const file of files) {
    const json = readJson(file);
    if (json.features) {
      items = [...items, ...json.features];
    } else {
      excludedFiles.push(file);
    }
  }
  if (!fs.existsSync(`./${outputFolder}`)) {
    fs.mkdirSync(`./${outputFolder}`);
  }
  fs.writeFileSync(
    `./${outputFolder}/${resolution}.json`,
    JSON.stringify(items)
  );
  if (excludedFiles.length > 0) {
    fs.writeFileSync(
      `./${outputFolder}/${resolution}_excluded.json`,
      JSON.stringify(excludedFiles)
    );
  }

  return items;
}
