export let API_PATH: string;

if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
  API_PATH = ""; // relying on proxy setting
} else {
  API_PATH = "https://tasklist.kevinf.xyz/api/v1";
}

export const API_HEADERS = { "Content-type": "application/json" };
export const API_TIMEOUT = 5000;
export const ERROR_UNAUTHORIZED = "Unauthorized";

export const NAME_LENGTH = 60;
export const DEFAULT_LENGTH = 255;
