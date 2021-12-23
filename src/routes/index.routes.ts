import { Router } from "express";

import { routes as postRoutes } from "./post.routes";
import { routes as sessionRoutes } from "./session.routes";
import { routes as userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/auth", sessionRoutes);
routes.use("/post", postRoutes);

export { routes };
