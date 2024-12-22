/**
 * Handles requests to endpoints that are not found or unsupported.
 *
 * Depending on the HTTP method, it responds with a 404 status code and a message indicating
 * that the requested resource was not found or that the method is not accepted by the endpoint.
 *
 * The response includes the following details:
 * - `method`: The HTTP method used in the request.
 * - `endpoint`: The original URL of the request.
 *
 * @function handleNotFound
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */

const NotFoundService = (req, res, next) => {
  const messages = {
    GET: "The requested resource was not found",
    POST: "The endpoint does not accept POST requests",
    PUT: "The endpoint does not accept PUT requests",
    DELETE: "The endpoint does not accept DELETE requests",
    PATCH: "The endpoint does not accept PATCH requests",
  };

  const message = messages[req.method] || "The requested operation is not supported";

  res.status(404).json({
    ok: false,
    message,
    details: {
      method: req.method,
      endpoint: req.originalUrl,
    },
  });
};

export default NotFoundService;