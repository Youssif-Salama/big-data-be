import {Router} from "express";
import { attachGetQueryMiddleware } from "../../middlewares/attach.query.middlewares.js";
import { filterQueryMiddleware, paginationQueryMiddleware, searchQueryMiddleware, selectQueryMiddleware } from "../../middlewares/features.middlewares.js";
import { checkDataFromCaching, execute } from "../../middlewares/global.mddlewares.js";
import { filterOnExchangeSymbol } from "../middlewares/global.middlewares.js";

const metadataRoutes=Router({mergeParams:true});

// get all metadata featured
metadataRoutes.get("/all",attachGetQueryMiddleware("metadata"),searchQueryMiddleware(),paginationQueryMiddleware,selectQueryMiddleware,checkDataFromCaching,execute(  {
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

// get one metadata by its id
metadataRoutes.get("/:id",attachGetQueryMiddleware("metadata"),filterQueryMiddleware({fieldName:"_id",paramName:"id"}),selectQueryMiddleware,checkDataFromCaching,execute(  {
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

// get metadata on specific exchange
metadataRoutes.get("/",attachGetQueryMiddleware("metadata"),filterOnExchangeSymbol,checkDataFromCaching,paginationQueryMiddleware,selectQueryMiddleware,execute(  {
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

export default metadataRoutes;