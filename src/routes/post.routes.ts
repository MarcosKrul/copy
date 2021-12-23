import { Router } from "express";

import { PostController } from "@controllers/PostController";
import { ensureUserAuthenticatedMiddleware } from "@middlewares/ensureUserAuthenticatedMiddleware";

const routes = Router();
const postController = new PostController();

routes.get("/read", ensureUserAuthenticatedMiddleware, postController.read);
routes.post(
  "/create",
  ensureUserAuthenticatedMiddleware,
  postController.create
);
routes.get(
  "/read/:user_id",
  ensureUserAuthenticatedMiddleware,
  postController.readByUser
);

export { routes };
