import { isDev } from "@/registry/utils/checks/checks";

export async function asyncWait(ms: number) {
  // safe guard so it only runs in dev mode
  if (!isDev()) return;

  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function syncWait(ms: number) {
  // safe guard so it only runs in dev mode
  if (!isDev()) return;

  const start = Date.now();
  let now = start;
  while (now - start < ms) now = Date.now();
}
