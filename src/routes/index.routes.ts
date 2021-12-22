import { Router } from "express";

import { routes as userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);

export { routes };
