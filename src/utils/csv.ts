import { parse } from "csv-parse";

export function getDataFromCSV(fileContent: string, headers: string[]) {
  return new Promise((resolve, reject) => {
    parse(
      fileContent,
      {
        delimiter: ",",
        columns: headers,
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}
