// from sad man code

/**
 * Converts an array of objects to CSV format
 *
 * @example
 * const data = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * const csv = JsonToCsv({ data });
 * // Returns: "name,age\r\n"John",30\r\n"Jane",25"
 */
export function jsonToCsv<T extends Record<string, unknown>>({
  data,
}: {
  data: T[];
}): string {
  if (!Array.isArray(data) || data.length === 0)
    return "Data must be a non-empty array";

  // Get all unique headers from all objects
  const headers = Array.from(
    new Set(
      data.reduce<string[]>((acc, obj) => {
        acc.push(...Object.keys(obj));
        return acc;
      }, []),
    ),
  );

  // Generate CSV content
  const csv = [
    headers.join(","), // header row
    ...data.map((row) =>
      headers
        .map((fieldName) =>
          JSON.stringify(
            row[fieldName as keyof T] ?? "",
            // Handle null/undefined values and ensure proper escaping
            (_key: string, value: unknown) =>
              value === null || value === undefined ? "" : value,
          ).replaceAll(",", "،"),
        )
        .join(","),
    ),
  ].join("\r\n");

  return csv;
}
