import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for your JSON files
const candle_path = path.join(__dirname, "./development/candle.json");
const exchange_path = path.join(__dirname, "./development/exchange.json");
const metadata_path = path.join(__dirname, "./development/metadata.json");


/**
 * Reads and parses a JSON file from the development directory.
 *
 * @param {string} fileName - The name of the JSON file to read, without the .json extension.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON object if successful, or rejects with an error if the file cannot be read or parsed.
 * @throws {Error} - Throws an error if the file cannot be read or parsed.
 */

const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, './development', `${fileName}.json`);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error(`Failed to read file: ${filePath}. Error: ${err.message}`));
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData.hits.hits);
        } catch (parseError) {
          reject(new Error(`Failed to parse file: ${filePath}. Error: ${parseError.message}`));
        }
      }
    });
  });
};


/**
 * Loads the database files (candles.json, exchange.json, and metadata.json) and checks if they exist.
 *
 * @returns {Promise<Object>} A promise that resolves to an object with the following properties:
 *   - message: A string describing the result of the loading process.
 *   - status: A number indicating the HTTP status code (200 or 500).
 *   - flag: A boolean indicating whether the files were loaded successfully (true or false).
 * @throws {Error} If there is an error loading the database files, the promise is rejected with an appropriate error message.
 */
const loadDbFiles = () => {
  return new Promise((resolve, reject) => {
    try {
      if (
        fs.existsSync(candle_path) &&
        fs.existsSync(exchange_path) &&
        fs.existsSync(metadata_path)
      ) {
        resolve({
          message: "Database files loaded successfully",
          status: 200,
          flag: true,
        });
      } else {
        resolve({
          message: "Failed to load database files",
          status: 500,
          flag: false,
        });
      }
    } catch (error) {
      reject(new Error(`Error loading database files: ${error.message}`));
    }
  });
};

export { readJsonFile };
export default loadDbFiles;