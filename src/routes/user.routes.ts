import { Router } from "express";

import { UserController } from "@controllers/UserController";
import { ensureUserAuthenticatedMiddleware } from "@middlewares/ensureUserAuthenticatedMiddleware";

const routes = Router();
const userController = new UserController();

routes.get("/read", ensureUserAuthenticatedMiddleware, userController.read);
routes.post("/create", userController.create);

export { routes };
