export * from "./hoc";
export * from "./handlers";
export * from "./models";
export * from "./dao";
export * from "./config";

declare global {
  interface Window {
    env: {
      [key: string]: any;
    };
  }
}
