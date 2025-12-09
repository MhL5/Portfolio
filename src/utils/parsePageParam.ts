/**
 * Parses the page parameter from the URL search parameters.
 * If the parameter is not a valid integer, returns 1.
 */
export function parsePageParam(page: string | null | undefined) {
  const parsedNumber = Number(page || 1);
  return Number.isNaN(parsedNumber) ? 1 : Math.max(1, Math.floor(parsedNumber));
}
