import {Router} from "express";
import candelRoutes from "../modules/routes/candel.routes.js";
import exchangeRoutes from "../modules/routes/exchange.routes.js";
import metadataRoutes from "../modules/routes/metadata.routes.js";

const v1Router=Router();

v1Router.use("/candel",candelRoutes);
v1Router.use("/exchange",exchangeRoutes);
v1Router.use("/meta-data",metadataRoutes);

export default v1Router;