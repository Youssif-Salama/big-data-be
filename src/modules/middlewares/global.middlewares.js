/**
 * Filter the data in the request object by the exchange symbol.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the request pipeline.
 */
export const filterOnExchangeSymbol=(req,res,next)=>{
  const {symbol}=req.params;
  if(!symbol) return next();
  req.data=req.data.filter(item=>item._source.symbol==symbol);
  next();
}