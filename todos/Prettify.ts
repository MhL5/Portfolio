export type Prettify<T> = {
  [k in keyof T]: T[k];
} & {};
