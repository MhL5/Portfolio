import fs from "node:fs/promises";
import type { StringWithAutoComplete } from "@/registry/types/AutoComplete/AutoComplete";

type FileReaderParamsPath = StringWithAutoComplete<
  | "src/app/(with-navigation)/snippets/components/"
  | "src/app/(with-navigation)/snippets/configs/"
  | "src/app/(with-navigation)/snippets/hooks/"
  | "src/app/(with-navigation)/snippets/types/"
  | "src/app/(with-navigation)/snippets/utils/"
>;

export async function fileReader(path: FileReaderParamsPath) {
  try {
    return await fs.readFile(`${process.cwd()}/${path}`, "utf8");
  } catch (error) {
    return error instanceof Error
      ? error?.message
      : "Something went wrong while importing the file!";
  }
}
