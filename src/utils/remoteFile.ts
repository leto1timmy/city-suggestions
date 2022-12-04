import { get } from "https";
import { createWriteStream, existsSync, mkdirSync } from "fs";

export function getRemoteFile(path: string, filename: string, url: string) {
  return new Promise<void>((resolve, reject) => {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
    const fileStream = createWriteStream(path + "/" + filename);
    get(url, (response) => {
      response.pipe(fileStream).on("close", () => resolve());
    });
  });
}
