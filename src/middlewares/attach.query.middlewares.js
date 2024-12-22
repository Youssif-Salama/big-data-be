import { readJsonFile } from "../../database.js";
import { AppError, CatchAsyncError } from "../services/error.handler.service.js";

/**
 * Attaches data from a JSON file to the request object.
 *
 * @param {String} whichFileToRead - The name of the JSON file to read.
 *
 * @example
 * // Attach data from exchange.json to the request object
 * router.get("/",attachGetQueryMiddleware("exchange"));
 *
 * @function attachGetQueryMiddleware
 * @returns {Function} A middleware function that attaches the data to the request object.
 */
export const attachGetQueryMiddleware = (whichFileToRead)=>CatchAsyncError(async(req,res,next)=>{
  const result= await readJsonFile(whichFileToRead);
  if(!result) throw new AppError(`Failed to fetch from ${whichFileToRead} file`,500);
  req.data=Array.from(result);
  next();
})