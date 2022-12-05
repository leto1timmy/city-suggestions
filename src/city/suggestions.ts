import fuzz, { FuzzballExtractOptions } from "fuzzball";
import haversine from "haversine-distance";
import { resolve } from "path";
import { Suggestion, City } from "./types";
import { getDataFromCSV } from "./../utils/csv";
import { getRemoteFile } from "./../utils/remoteFile";
import { existsSync, readFileSync } from "fs";
import logger from "../utils/logger";

export async function getCitySuggestions(
  query: string,
  lat?: number,
  lng?: number
): Promise<Suggestion[]> {
  // first call: download file from remote gist
  // other calls: get saved file
  const CITIES_FILE_NAME: string = "cities.csv";
  const CITIES_FILE_PATH: string = "./data/";
  const csvFilePath: string = resolve(__dirname, CITIES_FILE_PATH);

  if (!existsSync(resolve(csvFilePath, CITIES_FILE_NAME))) {
    try {
      await getRemoteFile(
        csvFilePath,
        CITIES_FILE_NAME,
        process.env.CITIES_DATASET_URL || ""
      );
    } catch (error) {
      logger.error(error);
    }
  }

  const fileContent: string = readFileSync(
    resolve(csvFilePath, CITIES_FILE_NAME),
    {
      encoding: "utf-8",
    }
  );

  // CSV parsing
  const headers: string[] = ["city", "lat", "lng", "country", "population"];
  const cities: City[] = (await getDataFromCSV(fileContent, headers)) as City[];

  // use token_set_ratio alg based on city field
  // possible to adjust limit and cutoff parameters
  const options: FuzzballExtractOptions = {
    scorer: fuzz.token_set_ratio,
    processor: (city: City) => city.city,
    limit: 5,
    cutoff: 65,
  };

  const result = fuzz.extract(query, cities, options);

  if (!result || result.length === 0) {
    return [];
  }

  // calculate distance to point using haversine formula
  if (lat && lng) {
    for (const el of result) {
      el[0].distance = haversine(
        { lat, lng },
        { lat: el[0].lat, lng: el[0].lng }
      );
    }
  }

  // sort results based on ratio and distance
  result.sort((a, b) => {
    const aRatio = a[1];
    const bRation = b[1];
    const aDistance = a[0].distance;
    const bDistance = b[0].distance;

    if (aRatio === bRation) {
      return bDistance > aDistance ? -1 : bDistance < aDistance ? 1 : 0;
    } else {
      return aRatio > bRation ? -1 : 1;
    }
  });

  // suggestions mapping
  return result.map((suggestion) => {
    return {
      name: suggestion[0].city,
      latitude: String(suggestion[0].lat),
      longitude: String(suggestion[0].lng),
      score: suggestion[1] / 100,
      distance: suggestion[0].distance,
    };
  }) as Suggestion[];
}
