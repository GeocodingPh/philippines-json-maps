import { Schema, model } from "mongoose";
import env from "./env";

const geoSchema = new Schema({
  type: String,
  geometry: {
    type: { type: String },
    coordinates: [],
  },
  properties: {
    adm1_psgc: Number,
    adm1_en: String,
    adm2_en: String,
    adm3_en: String,
    adm4_en: String,
    geo_level: String,
    len_crs: Number,
    area_crs: Number,
    len_km: Number,
    area_km2: Number,
  },
});

geoSchema.index({ geometry: "2dsphere" });

const GeoModel = model(env.mongoCollection, geoSchema, env.mongoCollection);

export default GeoModel;
