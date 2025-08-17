export function toCamelCase(str: string): string {
  return str.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function toCapitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toKebabCase(str: string) {
  return str.replaceAll(" ", "-");
}
