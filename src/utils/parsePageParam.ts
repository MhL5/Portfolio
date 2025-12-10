/**
 * Parses the page parameter from the URL search parameters.
 * If the parameter is not a valid integer, returns 1.
 */
export function parsePageSearchParam(
  page: string | null | undefined | string[],
) {
  const parsedNumber = +(page || 1);

  if (Number.isNaN(parsedNumber) || !Number.isFinite(parsedNumber)) return 1;
  return Math.max(1, Math.floor(parsedNumber));
}
