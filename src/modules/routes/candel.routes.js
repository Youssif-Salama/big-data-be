import {Router} from "express";
import { attachGetQueryMiddleware } from "../../middlewares/attach.query.middlewares.js";
import { filterQueryMiddleware, paginationQueryMiddleware, searchQueryMiddleware, selectQueryMiddleware } from "../../middlewares/features.middlewares.js";
import { checkDataFromCaching, dateRangeFilter, execute } from "../../middlewares/global.mddlewares.js";
import { filterOnExchangeSymbol } from "../middlewares/global.middlewares.js";

const candelRoutes=Router({mergeParams:true});

// get all candels featured
candelRoutes.get("/all",attachGetQueryMiddleware("candle"),searchQueryMiddleware(),paginationQueryMiddleware,selectQueryMiddleware,checkDataFromCaching,execute(  {
    status: 200,
    result: {
      ok:true,
      message: "success"
    }
  },
  {
    status: 404,
    result: {
      ok:false,
      message: "failed"
    }
  }));

// get one candel by its id
candelRoutes.get("/:id",attachGetQueryMiddleware("candle"),filterQueryMiddleware({fieldName:"_id",paramName:"id"}),selectQueryMiddleware,checkDataFromCaching,execute(  {
    status: 200,
    result: {
      ok:true,
      message: "success"
    }
  },
  {
    status: 404,
    result: {
      ok:false,
      message: "failed"
    }
  }));

// get candels on specific exchange
candelRoutes.get("/",attachGetQueryMiddleware("candle"),filterOnExchangeSymbol,dateRangeFilter,paginationQueryMiddleware,selectQueryMiddleware,checkDataFromCaching,execute(  {
    status: 200,
    result: {
      ok:true,
      message: "success"
    }
  },
  {
    status: 404,
    result: {
      ok:false,
      message: "failed"
    }
  }));

export default candelRoutes;