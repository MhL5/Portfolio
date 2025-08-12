export const filterValidStringParams = (params: Record<string, unknown>) =>
  Object.keys(params).reduce<Record<string, string>>((acc, key) => {
    const value = params[key];
    if (!value) return acc;

    if (typeof value === "string" && value.trim().length !== 0)
      acc[key] = value;

    return acc;
  }, {});
