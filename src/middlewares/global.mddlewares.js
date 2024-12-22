import { CatchAsyncError } from "../services/error.handler.service.js";
import RedisService from "../services/ioredis.service.js";


export const execute = (success, fail) => async (req, res) => {
  const { data = null, meta = null } = req;
  const cacheKey = req.originalUrl;

  try {
    if (data) {
      const cachedData = JSON.stringify(data);
      await RedisService.set(cacheKey, cachedData, "EX", 3600);
    }

    if (!data) {
      return next(new AppErrorService(fail?.status || 500, fail?.result));
    }

    success.result.data = data;
    success.result.meta = meta;

    res.status(success?.status || 200).json(success.result);
  } catch (error) {
    console.error("Error in execute middleware:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const checkDataFromCaching = CatchAsyncError(async (req, res, next) => {
  const { meta = null } = req;
  const cacheKey = req.originalUrl;

  try {
    const cachedData = await RedisService.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        ok:true,
        message: "Fetch cached data successfully",
        data: JSON.parse(cachedData),
        meta,
      });
    }

    next();
  } catch (error) {
    console.error("Redis caching error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});



export const dateRangeFilter=CatchAsyncError(async(req,res,next)=>{
  const {startDate,endDate}=req.query;
  if(!startDate || !endDate) return next();
  const start=new Date(startDate);
  const end=new Date(endDate);
  req.data=req.data.filter(item=>new Date(item?._source?.dateTime)>=start && new Date(item?._source?.dateTime)<end);
  next();
})