export const isServer = () => typeof window === "undefined";

export const isClient = () => typeof window !== "undefined";

export const isDev = () => process.env.NODE_ENV === "development";
