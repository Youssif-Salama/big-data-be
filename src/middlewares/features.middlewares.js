import { AppError, CatchAsyncError } from "../services/error.handler.service.js";

/**
 * Filter the data in the request object by a given field name and parameter name.
 *
 * If either the field name or the parameter name is not provided, the middleware will not perform any filtering and the request object will remain unchanged.
 *
 * The filtered data is stored in the request object and passed to the next middleware in the request pipeline.
 *
 * @param {Object} options - An object with the following properties:
 *   - fieldName: The name of the field in the data object to filter by.
 *   - paramName: The value of the parameter to filter by.
 *
 * @returns {Function} A middleware function that filters the data in the request object.
 */
export const filterQueryMiddleware =
  ({ fieldName, paramName }) =>
  CatchAsyncError(async(req, res, next) => {
    if (!fieldName | !paramName) throw new AppError("Missing field name or parameter name", 400);
    const data = req.data;
    const filteredData = data.filter((item) => item[fieldName] == req.params[paramName]);
    req.data = filteredData;
    next();
  });


/**
 * Selects only the specified fields from the data in the request object.
 *
 * The selectors are provided in the request query as an array of strings.
 *
 * The selected data is stored in the request object and passed to the next middleware in the request pipeline.
 *
 * If the selectors are not provided in the request query, the middleware will not perform any selection and the request object will remain unchanged.
 */
export const selectQueryMiddleware = (req, res, next) => {
  const { selectors } = req.query;

  if (!selectors) return next();

  let parsedSelectors;
  try {
    parsedSelectors = JSON.parse(selectors); // Parse JSON string selectors
  } catch (error) {
    return res.status(400).json({ error: "Invalid selectors format" });
  }

  if (!Array.isArray(parsedSelectors)) return next();

  // Helper function to set nested values in an object
  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    keys.reduce((acc, key, idx) => {
      if (idx === keys.length - 1) {
        acc[key] = value;
      } else {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }
    }, obj);
  };

  const data = req.data;
  req.data = data.map((item) => {
    const selectedItem = {};
    parsedSelectors.forEach((selector) => {
      const value = selector.split('.').reduce((acc, key) => acc && acc[key], item); // Resolve nested value
      if (value !== undefined) setNestedValue(selectedItem, selector, value); // Set value in nested structure
    });
    return selectedItem;
  });

  next();
};




/**
 * Paginates the data in the request object.
 *
 * If the "page" and/or "limit" parameters are not provided in the request query, the middleware will use the default values of 1 and 10 respectively.
 *
 * The paginated data is stored in the request object and passed to the next middleware in the request pipeline.
 *
 * The following metadata is also stored in the request object:
 *   - totalData: The total number of items in the data.
 *   - totalPages: The total number of pages.
 *   - hasNext: A boolean indicating whether there is a next page.
 *   - hasPrev: A boolean indicating whether there is a previous page.
 *   - page: The current page number.
 *   - limit: The current limit number.
 *
 * @example
 * // Paginate the data in the request object with a page size of 10 and a default page number of 1
 * router.get("/",paginationQueryMiddleware());
 *
 * @function paginationQueryMiddleware
 * @returns {Function} A middleware function that paginates the data in the request object.
 */
export const paginationQueryMiddleware = (req, res, next) => {
  const { page, limit } = req.query;
  const pageNo = page || 1;
  const limitNo = limit || 10;
  const skip = (pageNo - 1) * limitNo;
  const data = req.data;

  // apply to get meta
  const meta = {
    totalData: data.length,
    totalPages: Math.ceil(data.length / limitNo),
    hasNext: pageNo < (Math.ceil(data.length / limitNo)),
    hasPrev: pageNo > 1,
    page: pageNo,
    limit: limitNo,
  };

  // apply pagination
  const paginatedData = data.slice(skip, skip + limitNo);
  req.data = paginatedData;
  req.meta=meta;
  next();
};


/**
 * Searches the data in the request object for a given search query.
 *
 * The search query is provided in the request query as a string.
 *
 * The search is case-insensitive and will match any field that contains the search query.
 *
 * The searched data is stored in the request object and passed to the next middleware in the request pipeline.
 *
 * If the search query is not provided in the request query, the middleware will not perform any search and the request object will remain unchanged.
 *
 * @param {Array<String>} fields - An array of field names to search.
 *
 * @returns {Function} A middleware function that searches the data in the request object.
 */
export const searchQueryMiddleware = (fields) => (req, res, next) => {
  if (!fields || !Array.isArray(fields)) return next();

  const data = req.data;
  const { search } = req.query;
  if (!search) return next();

  // Helper function to get the value at a nested path
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  // Filter data based on whether any of the fields contain the search term
  req.data = data.filter(item =>
    fields.some(field => {
      const value = getNestedValue(item, field);
      return typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase());
    })
  );

  next();
};



/**
 * Sorts the data in the request object based on the given key and value.
 *
 * The sort key and value are provided in the request query as strings.
 *
 * The sort is case-sensitive and will sort the data in ascending or descending order.
 *
 * The sorted data is stored in the request object and passed to the next middleware in the request pipeline.
 *
 * If the sort key and value are not provided in the request query, the middleware will not perform any sorting and the request object will remain unchanged.
 */
export const sortQueryMiddleware=(req,res,next)=>{
  const {sortKey,sortValue}=req.query;
  if(!sortKey || !sortValue) return next();
  const data=req.data;
  req.data=data.sort((a,b)=>{
    if(sortValue=="asc") return a[sortKey]-b[sortKey];
    if(sortValue=="desc") return b[sortKey]-a[sortKey];
    else return next();
  })
  next();
}
