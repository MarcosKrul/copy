import { Request, Response } from "express";

import { AppError } from "@errors/AppError";
import { LoginService } from "@services/session";

class SessionController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const loginService = new LoginService();

      const user = await loginService.execute({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "Operação finalizada com sucesso.",
        data: user,
      });
    } catch (e) {
      return res.status(AppError.getErrorStatusCode(e)).json({
        success: false,
        message: AppError.getErrorMessage(e),
      });
    }
  }
}

export { SessionController };
