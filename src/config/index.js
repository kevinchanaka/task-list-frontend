export let API_PATH;

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  API_PATH = ''; // relying on proxy setting
} else {
  API_PATH = 'http://www.example.com/api/v1'; // placeholder
}

export const API_HEADERS = {'Content-type': 'application/json'};
export const API_TIMEOUT = 5000;

export const NAME_LENGTH = 60;
export const DEFAULT_LENGTH = 255;
