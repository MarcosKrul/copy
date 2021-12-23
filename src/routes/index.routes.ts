import { Router } from "express";

import { routes as sessionRoutes } from "./session.routes";
import { routes as userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/auth", sessionRoutes);

export { routes };
