export function csvToJson(csv: string): Record<string, unknown>[] {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");

  const data = lines.slice(1).reduce(
    (acc, line) => {
      // if line is empty, return the accumulator
      if (!line) return acc;

      const lineValues = line.split(",");

      const result = headers.reduce(
        (acc, header, index) => {
          const value = lineValues[index];
          acc[header] = value === "" || isNaN(+value) ? value : +value;
          return acc;
        },
        {} as Record<string, unknown>,
      );
      acc.push(result);
      return acc;
    },
    [] as Record<string, unknown>[],
  );

  return data;
}
