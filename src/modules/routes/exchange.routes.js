import {Router} from "express";
import { attachGetQueryMiddleware } from "../../middlewares/attach.query.middlewares.js";
import { filterQueryMiddleware, paginationQueryMiddleware, searchQueryMiddleware, selectQueryMiddleware } from "../../middlewares/features.middlewares.js";
import { checkDataFromCaching, execute } from "../../middlewares/global.mddlewares.js";
import metadataRoutes from "./metadata.routes.js";
import candelRoutes from "./candel.routes.js";

const exchangeRoutes=Router();

// get all exchanges featured
exchangeRoutes.get("/all",attachGetQueryMiddleware("exchange"),searchQueryMiddleware(),paginationQueryMiddleware,selectQueryMiddleware,checkDataFromCaching,execute(  {
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

// get one exchange by its id
exchangeRoutes.get("/:id",attachGetQueryMiddleware("exchange"),filterQueryMiddleware({fieldName:"_id",paramName:"id"}),selectQueryMiddleware,checkDataFromCaching,execute(  {
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

exchangeRoutes.use("/:symbol/metas/",metadataRoutes);
exchangeRoutes.use("/:symbol/candels/",candelRoutes);

export default exchangeRoutes;