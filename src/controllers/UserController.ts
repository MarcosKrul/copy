import { Request, Response } from "express";

import { AppError } from "@errors/AppError";
import { ListUserService, CreateUserService } from "@services/user/";

class UserController {
  public async read(_: Request, res: Response): Promise<Response> {
    try {
      const listUserService = new ListUserService();

      const users = await listUserService.execute();

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        content: users,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        email,
        name,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        content: user,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }
}

export { UserController };
