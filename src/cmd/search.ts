import { disconnect } from "mongoose";
import { connectDB } from "../modules/connectDB";
import GeoModel from "../modules/geoSchema";

export async function search(yLatitude: number, xLongitude: number) {
  await connectDB();

  const result = await GeoModel.find({
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [xLongitude, yLatitude],
        },
      },
    },
  });
  console.log(result);
  await disconnect();
}
