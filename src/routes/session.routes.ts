import { Router } from "express";

import { SessionController } from "@controllers/SessionController";

const routes = Router();
const sessionController = new SessionController();

routes.post("/login", sessionController.login);

export { routes };
