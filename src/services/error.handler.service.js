/**
 * Catches any errors that occur during an async middleware function and passes them to the next error-handling middleware.
 *
 * @function CatchAsyncError
 * @param {Function} fn The async middleware function to catch errors from.
 * @returns {Function} The wrapped middleware with error catching.
 */
export const CatchAsyncError=(fn)=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(err=>next(err));
  }
}


export class AppError extends Error{
  /**
   * Constructor for the AppError class.
   *
   * @param {String} message The error message.
   * @param {Number} statusCode The HTTP status code for the error.
   */
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
  }
}