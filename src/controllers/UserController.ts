import { Request, Response } from "express";
import { AppError } from "src/errors/AppError";

class UserController {
  public async read(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({
        users: [
          {
            id: "1",
            nome: "joao",
          },
        ],
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
