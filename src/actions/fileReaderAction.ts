"use server";

import { fileReader } from "@/utils/fileReader";

export async function fileReaderAction(path: Parameters<typeof fileReader>[0]) {
  return await fileReader(path);
}
