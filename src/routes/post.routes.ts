import { Router } from "express";

import { PostController } from "@controllers/PostController";

const routes = Router();
const postController = new PostController();

routes.get("/read", postController.read);
routes.post("/create", postController.create);

export { routes };
